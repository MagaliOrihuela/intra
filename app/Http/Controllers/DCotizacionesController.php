<?php

namespace App\Http\Controllers;

use App\Models\CCategory;
use App\Models\DCotizaciones;
use App\Models\DGuide;
use App\Models\ECotizaciones;
use App\Models\CRate;
use DateTime;
use Illuminate\Http\Request;

class DCotizacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $cotid = $request->cotizacion_id;
      $sqlC = ECotizaciones::where('id',$cotid)
                                 ->where('status_id',1)
                                 ->with('client.categorycte:id,category_cte,discount')
                                 ->with('client.agent:id,name_agent')
                                    ->get(['client_id','updated_at']);
      if($sqlC != NULL) {
         $eCot = $sqlC[0];
         $arrR = $this->gridDCot($cotid,'',0);
         
         $dateCot = new DateTime($eCot->updated_at);
         $hoy = new DateTime('now');
         $dateDif = $dateCot->diff($hoy);
         $days = $dateDif->format('%d');

         return response()->json([
            'success'    => true ,
            'id_cot' => $cotid,
            'days' => $days,
            'cNameAgent'   => $eCot->client->agent->name_agent,
            'cNameClient'   => $eCot->client->short_name,
            'cDesc1' => $eCot->client->categorycte->discount,
            'gridpCot' => $arrR['gridDCot'],
            'sumSubt' => $arrR['sumSubt'],
            'Iva' => $arrR['Iva'],
            'sumTotal' => $arrR['sumTotal'],
         ], 200);
      } else {
         return response()->json([
            'success'    => false ,
         ], 401);
      }    
    }
    //genera el grid del detalle de la cotización y los cálculos de importe, descuento y total con iva
    public function gridDCot($cotid,$dcotid,$part){
      $dCotPart = DCotizaciones::with('article.category:id,category,icon,color')
                                    ->where('cotizacion_id',$cotid)->get();
      $arrpCot = array();
      $gDCot = array();
      $guide = array();
      $sumSubt = 0;
      $sumDesc = 0;
      $totalIva = 0;
      $prub = '';
      foreach ($dCotPart as $dcotP) { //escapamos el detalle de la cotización
         $article = $dcotP->article;
         $category = $article->category;
         $cont = $cant = $subt = $desc = 0;
         $stgPorc = '';
         
         if($dcotP->unit_id == 3 || $dcotP->unit_id == 6){
            $cont = $article->packing2;
         } elseif($dcotP->unit_id <> 1){
            $cont = $article->packing1;
         } else{
            $cont = 1;
         }
         $cant = $dcotP->quantity * $cont;
         $subt = $dcotP->price * $cant;
         $stgPorc = $dcotP->desc1.'%';
         if($dcotP->desc2){
            $stgPorc = $stgPorc.'y'.$dcotP->desc2.'%';
         }
         $stgUnit = '';
         if($cont > 1 && $dcotP->unit_id <> 3){
            $stgUnit = '('.$cont.' pzas)';
         } else if($cont > 1){
            $stgUnit = '('.$cont.' m)';
         }
         if(($dcotid == '' && $part == 0) 
            || $dcotid == $dcotP->id 
            || ($dcotP->entry_id >= $part && $part > 0))//genera el arreglo de las partidas
         {
            $arrpCot = array(
               'id'=>$dcotP->id,
               'entry_id'=>$dcotP->entry_id,
               'article_id'=>$dcotP->article_id,
               'article'=>$article->article,
               'category'=>$category->category,
               'icon'=>$category->icon,
               'color' => $category->color,
               'quantity'=>$dcotP->quantity,
               'unit'=> $dcotP->unit.$stgUnit,
               'price'=>'$'.number_format($dcotP->price,2),
               'subt'=>'$'.number_format($subt,2),
               'desc'=>$stgPorc);
            //inserta el arreglo de cada partida al grid
            array_push($gDCot,$arrpCot);
         }
         $sumSubt += $subt;
         $desc = ($subt * $dcotP->desc1)/100;
         $subt -= $desc;
         $sumDesc += $desc;

         if($dcotP->desc2){
            $desc = ($subt * $dcotP->desc2)/100;
            $subt -= $desc;
            $sumDesc += $desc;
         }
         //si la categoría es perfiles se agrega la guía
         if($category->id == 3){
            $sqlGuide = DGuide::with('rate')
                                 ->with('rate.service')
                                    ->where('d_cot_id',$dcotP->id)
                                       ->get(['rate_id','price']);
            $service = CCategory::where('id',6)
                                       ->first();
            $guide = $sqlGuide[0];
            if(($dcotid == '' && $part == 0) 
               || $dcotid == $dcotP->id 
               || ($part <= $dcotP->entry_id && $part > 0))//genera el arreglo de cada partida
            {
               $arrpCot = array(
                  'id'=> $dcotP->id.'S',
                  'entry_id'=> $dcotP->entry_id + 1,
                  // 'article_id'=> $guide->article->id,
                  'article'=> $guide->rate->service->service,
                  'category'=> $service->category,
                  'icon'=> $service->icon,
                  'color' => $service->color,
                  'quantity'=> $dcotP->quantity,
                  // 'unit'=> '',
                  'price'=> $guide->rate->price,
                  'subt'=> '$'.number_format($guide->price,2),
                  // 'desc'=> ''
               );
               array_push($gDCot,$arrpCot);
            }
            $sumSubt += $guide->price;
         }
      }
      // // $totalIva = number_format(($sumSubt - $sumDesc) * 1.16,2);
      $subtDesc = $sumSubt - $sumDesc;
      $iva = $subtDesc * 0.16;
      $totalIva = $subtDesc + $iva;

      $arrResp = array(
         // 'prubaG' => $sqlGuide, 
         'cotizacion_id' => $cotid,
         "gridDCot" => $gDCot,
         "sumSubt" => number_format($subtDesc,2),
         "Iva" => number_format($iva,2),
         "sumTotal" => number_format($totalIva,2)
      );
      return $arrResp;

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, DCotizaciones $dCotizaciones)
    {
      try {
         $upd = false;
         if($request->dCot > 0){ //actualiza la partida
            $dCot = $dCotizaciones::find($request->dCot);
            $dCot->article_id = $request->articleId;
            $dCot->unit = $request->unit;
            $dCot->unit_id = $request->unitId;
            $dCot->quantity = $request->quantity;
            $dCot->price = $request->price;
            $dCot->desc1 = $request->desc1;
            $dCot->save();
            $msg = 0;
            $upd = true;
            //actualizar guía de la perfilería
            if($request->categoryId == 3){
               $rate = CRate::where('range_id',$request->range)
                                 ->where('category_id',$request->categoryId)
                                 ->where('service_id',$request->service)
                                    ->first();
               $guidSub = $rate->price * $dCot->quantity;
               $guide = DGuide::where('d_cot_id',$request->dCot)
                                  ->first();
               $guide->price = $guidSub;
               $guide->save();
            }
         }else{
            // inserta una nueva partida, obtenemos la ultima partida registrada
            $entry = $dCotizaciones::with('article.category:id,category,icon,color')
                                    ->where('cotizacion_id',$request->cotizacionId)
                                    ->orderBy('entry_id','desc')
                                       ->first();
            if($entry == null){
               $entry_id = 1;
            } else if($entry->article->category->id == 3){
               $entry_id = $entry->entry_id + 2;
            } else{
               $entry_id = $entry->entry_id + 1;
            }
            // if( $eEntry->entry_id != '' ) { $entry_id = ( $eEntry->entry_id + 1 ); } else { $entry_id = 1; }
            $dCot = new $dCotizaciones;
            $dCot->cotizacion_id = $request->cotizacionId;
            $dCot->entry_id      = $entry_id;
            $dCot->article_id   = $request->articleId;
            $dCot->unit          = $request->unit;
            $dCot->unit_id       = $request->unitId;
            $dCot->quantity      = $request->quantity;
            $dCot->price         = $request->price;
            $dCot->desc1         = $request->desc1;
            $dCot->desc2         = 0; // necesitamos definir si se daran descuentos extras
            $dCot->desc3         = 0;
            $dCot->save();     
            $msg = 1;

            //inserta la guía si es perfilería
            if($request->categoryId == 3){
               //consulta el estado a enviar las guías
               // $cpClient = $request->cp;
               // $str = substr($cpClient,0,2);
               // $sqlState = CState::where('cp_min','<',$str)
               //                   ->where('cp_max','>=',$str)
               //                      ->orWhere('cp_min',$str)
               //                         ->get();
               // $state = $sqlState[0];
               // $costG = $state->km * $state->price_km * $dCot->quantity;
               $rate = CRate::where('range_id',$request->range)
                                 ->where('category_id',$request->categoryId)
                                 ->where('service_id',$request->service)
                                    ->first();
               $guidSub = $rate->price * $dCot->quantity;
               $guide = new DGuide;
               $guide->price = $guidSub;
               $guide->d_cot_id = $dCot->id;
               $guide->rate_id = $rate->id;
               $guide->save();
            }         
         }
         $arrR = $this->gridDCot($request->cotizacionId,$dCot->id,0);

         return response()->json([ 
            'success' => true,
            'cotizacion_id' => $request->cotizacionId,
            'upd' => $upd,
            'gridpCot' => $arrR['gridDCot'],
            'sumSubt' => $arrR['sumSubt'],
            'Iva' => $arrR['Iva'],
            'sumTotal' => $arrR['sumTotal'],
            'msg' => $msg,
         ], 200); 
      } catch (\Exception $e) {
         return response()->json(['success' => false ], 405); 
      }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\DCotizaciones  $dCotizaciones
     * @return \Illuminate\Http\Response
     */
    public function show(DCotizaciones $dCotizaciones)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DCotizaciones  $dCotizaciones
     * @return \Illuminate\Http\Response
     */
    public function edit(DCotizaciones $dCotizaciones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DCotizaciones  $dCotizaciones
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DCotizaciones $dCotizaciones)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DCotizaciones  $dCotizaciones
     * @return \Illuminate\Http\Response
     */
    public function destroy(DCotizaciones $dCotizaciones, $id)
    {
      // return 
    }

   // elementos que acompañan a una cotizacion
   public function elements(Request $request, CCategory $cCategories)
   {
      $catalog = $cCategories::with('products')
                              ->with(['products.models' => function($query2){
                                 $query2->select('id','model','product_id','is_all')
                                          ->where('is_active',1)
                                          ->orderBy('model');}])
                              ->where('is_active',1)->get(['id','category','icon']);
      

      return   response()->json([
         'success'    => true ,
         'elements' => $catalog,
      ], 200);
   }
   //elimina la partida de la cotización
   public function deletePCot(Request $request, Dcotizaciones $dCotizaciones){
      $id_dCot = $request->idDcot;
      $arrDcot = $dCotizaciones::find($id_dCot);
      $arrCotps = $dCotizaciones::with('article:id,category_id')
                                    ->where('cotizacion_id',$arrDcot->cotizacion_id)
                                    ->where('entry_id','>',$arrDcot->entry_id)
                                    ->get(['id','entry_id','cotizacion_id','article_id']);
      $entryO = $entry = $arrDcot->entry_id;
      $arrDcot->delete();
      foreach($arrCotps as $dCot){
         $dCotizaciones::where('id',$dCot->id)
                           ->update(['entry_id'=>$entry]);
         $entryId = $dCot->article->category_id;
         if($entryId == 3){
            $entry += 2;
         } else{
            $entry += 1;
         }
      }
      $arrR = $this->gridDCot($arrDcot->cotizacion_id,'',$entryO);

      return response()->json([
         'success' => true,
         'cotizacion_id' => $arrDcot->cotizacion_id,
         'gridpCot' => $arrR['gridDCot'],
         'sumSubt' => $arrR['sumSubt'],
         'Iva' => $arrR['Iva'],
         'sumTotal' => $arrR['sumTotal'],
      ], 200);
   }
   //extrae los datos de la dcotizacion para su modificación
   public function updateDCot(Request $request){
      $idDcot = $request->idDcot;

      $dCot = DCotizaciones::with('article:id,category_id,product_id,model_id')
                              ->where('id',$idDcot)->get(['id','entry_id','article_id','unit_id','quantity']);
      
      return response()->json([
         'success'    => true,
         'dCot' => $dCot,
      ], 200);
   }
}

