<?php

namespace App\Http\Controllers;

use App\Models\CArticles;
use App\Models\CBoardingType;
use App\Models\CCategory;
use App\Models\CCfdi;
use App\Models\CClients;
use App\Models\CDeliveryServiceCompanies;
use App\Models\CDeliveryType;
use App\Models\CPaymentMethod;
use App\Models\CShippingAddress;
use App\Models\DCotizaciones;
use App\Models\ECotizaciones;
use App\Models\BProcesse;
use Carbon\Carbon;
use Facade\FlareClient\Http\Client;
use Illuminate\Http\Request;
use DateTime;

class ECotizacionesController extends Controller
{
   /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function index(Request $request, ECotizaciones $eCotizaciones)
   {
      $getis_parter = $request->partner ;
      $getclient_id = $request->client_id;
      
      $edCot = $eCotizaciones::with('status:id,status_name')
                                 ->with('client')
                                 ->with('client.agent:id,name_agent')
                                 ->with('dcotizaciones')
                                 ->with('dcotizaciones.article:id,article,category_id,packing1,packing2')
                                 ->with('dcotizaciones.guide:id,d_cot_id,price')
                                    ->where('status_id','<>','4')
                                    ->where(function($query) use ($getis_parter,$getclient_id) { 
                                       if($getis_parter == 0) {
                                          $query->where('client_id',$getclient_id); 
                                       }})
                                    ->get(['id','client_id','status_id','reference','factura_id','agent_performed_id','created_at','updated_at']);

      $hoy = new DateTime('now');

      foreach ($edCot as $cotv) { //escapamos cada cotización

         $dateCot = new DateTime($cotv->updated_at);//$eCot->created_at
         $dateDif = $dateCot->diff($hoy);
         $days = $dateDif->format('%d');
         //si la cotización es mayor a 3 días se cancela
         if($days >= 3){
            $canCot = ECotizaciones::find($cotv->id);
            $canCot->status_id = 4;
            $canCot->save();
         }
      }


      $arrGridCot = $this->dataPriceCot($edCot);

      return response()->json([
         'success' =>  true ,
          'eCot' =>  $arrGridCot,
         // 'prub' => $edCot
      ], 200);

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

   public function store(Request $request)
   {
      // obtenemos el agent_id

      $AgentId = CClients::where('id','=',$request->idClient)
      ->first();

      // verificamos quien realizo la cotizacion

      if($request->isPartner == 1 ) { $agentPerformedId = $request->idClient; } else { $agentPerformedId = 1000; }
      
      try {
         
         $eCot = new ECotizaciones;
         $eCot->reference                   = $request->reference;
         $eCot->status_id                   = 1;
         $eCot->client_id                   = $request->idClient;
         $eCot->agent_id                    = $AgentId->agent_id;
         $eCot->agent_performed_id          = $agentPerformedId;
         $eCot->payment_method_id           = $request->paymentMethods;
         $eCot->delivery_type_id            = $request->deliveryType;
         $eCot->cfdi_id                     = $request->CFDI;
         $eCot->boarding_type_id            = $request->boardingType;
         $eCot->delivery_service_compani_id = $request->deliveryServiceCompanies;
         $eCot->shipping_address_id         = $request->ShippingAddress;
         $eCot->account_number              = $request->noAccount;
         $eCot->is_facturado                = $request->isFactura;
         $eCot->save();

         $getis_parter = $request->isPartner ;
         $getclient_id = $request->idClient;

         $edCot = ECotizaciones::select('e_cotizaciones.*','c_clients.short_name','c_agents.name_agent','c_status.status_name')
                                 ->join('c_clients', 'c_clients.id', '=', 'e_cotizaciones.client_id')
                                 ->join('c_agents', 'c_agents.id', '=', 'e_cotizaciones.agent_id')
                                 ->join('c_status', 'c_status.id', '=', 'e_cotizaciones.status_id')
                                 ->where(function($query) use ($getis_parter,$getclient_id) { 
                                    if($getis_parter == 0) {
                                       $query->where('client_id',$getclient_id); 
                                    }})
                                 ->where('e_cotizaciones.id',"=",$eCot->id)
                                 ->with('dcotizaciones','dcotizaciones.article')->get();
         
         $arrGridCot = $this->dataPriceCot($edCot);


         return response()->json([ 
            'success' => true,
            'cotizacion_id' => $eCot->id,
            'eCot' => $arrGridCot 
         ], 200); 
      } catch (\Exception $e) {
      
         return response()->json([ 'success' => false ], 405); 
      }
   }

   /**
    * Display the specified resource.
    *
    * @param  \App\ECotizaciones  $eCotizaciones
    * @return \Illuminate\Http\Response
    */

   public function show(ECotizaciones $eCot)
   {
      //
   }

   /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\ECotizaciones  $eCotizaciones
    * @return \Illuminate\Http\Response
    */
   public function edit(ECotizaciones $eCotizaciones)
   {
      //
   }

   /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\ECotizaciones  $eCotizaciones
    * @return \Illuminate\Http\Response
    */
   public function update(Request $request, ECotizaciones $eCotizaciones)
   {
      //
   }

   /**
    * Remove the specified resource from storage.
    *
    * @param  \App\ECotizaciones  $eCotizaciones
    * @return \Illuminate\Http\Response
    */
   public function destroy($id)
   {
      $cotizacion = ECotizaciones::find($id);
      $cotizacion->delete();
   }

   public function articlesvlook(Request $request, CArticles $cArticles)
   {
      $getCategoryId = $request->categoryId;
      $getProductId = $request->productId;
      $getModelId = $request->modelId;

      if($getProductId == 0){
         $articles = $cArticles::select('id','article','unit','price1','price2','packing1','packing2','category_id','product_id','model_id')
                                 ->where('category_id',$getCategoryId)
                                    ->with('units')
                                       ->orderBy('article')->get();
         $prub = 'por category';
      } elseif($getModelId == 0){
         $articles = $cArticles::select('id','article','unit','price1','price2','packing1','packing2','category_id','product_id','model_id')
                                    ->where('category_id',$getCategoryId)
                                    ->where('product_id',$getProductId)
                                       ->with('units')
                                          ->orderBy('article')->get();
         $prub = 'por product';
      } else{
         $articles = $cArticles::select('id','article','unit','price1','price2','packing1','packing2','category_id','product_id','model_id')
                                    ->where('category_id',$getCategoryId)
                                    ->where('product_id',$getProductId)
                                    ->where('model_id','=',$getModelId)
                                       ->with('units')
                                          ->orderBy('article')->get();
         $prub = 'por model';
      }

         return response()->json([
            'success'  =>  true ,
            'articles' =>  $articles,
         ], 200);
   }

   public function configNewCot($getis_parter,$getclient_id) {

      $DSC = CDeliveryServiceCompanies::select('id','companie')->where('is_active','=','1')->get();
      $DT = CDeliveryType::select('id','delivery_type','is_boarding','is_address')->where('is_active','=','1')->get();
      $BT = CBoardingType::select('id','boarding_type')->where('is_active','=','1')->get();
      $PM = CPaymentMethod::select('id','payment_method','is_account')->where('is_active','=','1')->get();
      $SA = CShippingAddress::select('id','client_id','contact_name','label','address_line','n_ext','n_int','suburb','city','state','cp','short_reference')
      ->where(function($query) use ($getis_parter,$getclient_id){ 
            if($getis_parter == 0) {
               $query->where('client_id',$getclient_id); 
            }
         })
      ->get();
      $CFDI = CCfdi::select('id','cfdi','cfdi_name')->where('is_active','=','1')->get();

      return response()->json([
         'success'        =>  true ,
         'DSC'  =>  $DSC,
         'DT'  =>  $DT,
         'BT'  =>  $BT,
         'PM'  =>  $PM,
         'SA'  =>  $SA,
         'CFDI'  =>  $CFDI,
      ], 200);

   }

   public function canceledCot(Request $request){

      try {
         // actualizamos el status de la cotizacion a cancelado
         $cot = ECotizaciones::find($request->cotizacion_id);
         $cot->status_id = 4;
         $cot->save();

         // insertamos en bitacora la cancelacion
         $BProcesse = new BProcesse();
         $BProcesse->user_id = $request->user_id;
         $BProcesse->status_id = $request->status_id;
         $BProcesse->process = $request->process;
         $BProcesse->comment = $request->comment_cancel;
         $BProcesse->cotizacion_id = $request->cotizacion_id;
         $BProcesse->save();

         $edCot = ECotizaciones::with('status:id,status_name')
                                    ->with('client')
                                    ->with('client.agent:id,name_agent')
                                    ->with('dcotizaciones')
                                    ->with('dcotizaciones.article:id,article,packing1,packing2')
                                    ->where('id','=',$request->cotizacion_id)
                                    ->get(['id','client_id','agent_id','status_id','reference','factura_id','created_at']);
         
      $cot = $this->dataPriceCot($edCot);


         return response()->json([
            'success' => true,
            'datacot' => $cot,
         ],200);
      } catch (\Throwable $th) {
         return response()->json([
            'success' => false,
         ],200);
      }
   }

   public function updateDetails(Request $request){
      
      try {

         $upCot = ECotizaciones::where('e_cotizaciones.id',$request->id)->first();
         $upCot->reference =  $request->reference;
         $upCot->payment_method_id =  $request->paymentMethods;
         $upCot->delivery_type_id =  $request->deliveryType;

         $upCot->cfdi_id =  $request->CFDI;
         $upCot->account_number =  $request->noAccount;
         $upCot->is_facturado =  $request->isFactura;

         if( $request->ShippingAddress == '' ) { $upCot->shipping_address_id = null; } else { $upCot->shipping_address_id = $request->ShippingAddress; }
         if( $request->boardingType == '' ) { $upCot->boarding_type_id = null; } else { $upCot->boarding_type_id =  $request->boardingType; }
         if( $request->deliveryServiceCompanies == '' ) { $upCot->delivery_service_compani_id = null; } else { $upCot->delivery_service_compani_id =  $request->deliveryServiceCompanies; }
         $upCot->save();

         return response()->json([
            'success' => true,
         ],200);

      } catch (\Throwable $th) {

         return response()->json([
            'success' => false,
         ],200);

      }
   }
   
   public function dataCotizacion(Request $request){
      
      try {

         $datacotizacion = ECotizaciones::select('e_cotizaciones.client_id','e_cotizaciones.reference','e_cotizaciones.payment_method_id','c_payment_methods.payment_method','e_cotizaciones.account_number','e_cotizaciones.cfdi_id','c_cfdis.cfdi_name','e_cotizaciones.delivery_type_id','c_delivery_types.delivery_type','e_cotizaciones.boarding_type_id','c_boarding_types.boarding_type','e_cotizaciones.shipping_address_id','c_shipping_addresses.label','c_shipping_addresses.address_line','c_shipping_addresses.cp','c_shipping_addresses.n_ext','c_shipping_addresses.n_int','c_shipping_addresses.suburb','c_shipping_addresses.city','c_shipping_addresses.state','e_cotizaciones.delivery_service_compani_id','c_delivery_service_companies.companie','e_cotizaciones.created_at','c_clients.is_factura','c_clients.full_name','e_cotizaciones.is_facturado')
         ->join('c_clients', 'c_clients.id', '=', 'e_cotizaciones.client_id')
         ->join('c_payment_methods', 'c_payment_methods.id', '=', 'e_cotizaciones.payment_method_id')
         ->join('c_cfdis', 'c_cfdis.id', '=', 'e_cotizaciones.cfdi_id')
         ->leftjoin('c_delivery_types', 'c_delivery_types.id', '=', 'e_cotizaciones.delivery_type_id')
         ->leftjoin('c_boarding_types', 'c_boarding_types.id', '=', 'e_cotizaciones.boarding_type_id')
         ->leftjoin('c_shipping_addresses', 'c_shipping_addresses.id', '=', 'e_cotizaciones.shipping_address_id')
         ->leftjoin('c_delivery_service_companies', 'c_delivery_service_companies.id', '=', 'e_cotizaciones.shipping_address_id')
         ->where('e_cotizaciones.id',$request->id)->first();
   
         return response()->json([
            'success' => true,
            'datacotizacion' => $datacotizacion,
         ],200);

      } catch (\Throwable $th) {

         return response()->json([
            'success' => false,
         ],200);

      }
   }

   public function canceled(Request $request, ECotizaciones $eCotizaciones)
   {
      $getis_parter = $request->partner ;
      $getclient_id = $request->client_id;
      
      $edCot = $eCotizaciones::with('status:id,status_name')
                                 ->with('client')
                                 ->with('client.agent:id,name_agent')
                                 ->with('dcotizaciones')
                                 ->with('dcotizaciones.article:id,article,packing1,packing2')
                                    ->where('status_id','=','4')
                                    ->where(function($query) use ($getis_parter,$getclient_id) { 
                                       if($getis_parter == 0) {
                                          $query->where('client_id',$getclient_id); 
                                       }})
                                    ->get(['id','client_id','status_id','reference','factura_id','agent_performed_id','created_at']);
      
      $arrGridCot = $this->dataPriceCot($edCot);

      return response()->json([
         'success' =>  true ,
          'eCotCanceled' =>  $arrGridCot,
      ], 200);

   }
   
   public function recover(Request $request){
      
      try {

         $edCot = ECotizaciones::where('id','=',$request->id)
                                 ->first();
         $edCot->status_id = 1;
         $edCot->save();

         $BProcesse = new BProcesse();
         $BProcesse->user_id = $request->user_id;
         $BProcesse->status_id = $request->status_id;
         $BProcesse->process = $request->process;
         $BProcesse->cotizacion_id = $request->id;
         $BProcesse->save();

         $edCot = ECotizaciones::with('status:id,status_name')
                                 ->with('client')
                                 ->with('client.agent:id,name_agent')
                                 ->with('dcotizaciones')
                                 ->with('dcotizaciones.article:id,article,packing1,packing2')
                                 ->where('id','=',$request->id)
                                 ->get(['id','client_id','agent_id','status_id','reference','factura_id','created_at']);
      
         $cot = $this->dataPriceCot($edCot);

         return response()->json([
            'success' => true,
            'datacot' => $cot,
         ],200);

      } catch (\Throwable $th) {

         return response()->json([
            'success' => false,
         ],200);

      }
   }

   public function proccessOrder(Request $request){
      
      try {

         $edCot = ECotizaciones::where('id','=',$request->id)
                                 ->first();
         $edCot->status_id = 2;
         $edCot->save();

         return response()->json([
            'success' => true,
         ],200);

      } catch (\Throwable $th) {

         return response()->json([
            'success' => false,
         ],200);

      }
   }


   
   private function dataPriceCot($edCot) {

      $arrCot = array();
      $arrGridCot = array();

      foreach ($edCot as $cot) { //escapamos cada cotización

         $dcot = $cot->dcotizaciones;
         $sumSubt = 0;
         $totalIva = 0;
         
         foreach ($dcot as $dcotP) { //escapamos el detalle de la cotización

            $article = $dcotP->article;
            $cont = $cant = $subt = $desc = 0;
            
            if($dcotP->unit_id == 3 || $dcotP->unit_id == 6){
               $cont = $article->packing2;
            } elseif($dcotP->unit_id <> 1){
               $cont = $article->packing1;
            } else{
               $cont = 1;
            }
            
            $cant = $dcotP->quantity * $cont;
            $subt = $dcotP->price * $cant;
            $desc = ($subt * $dcotP->desc1)/100;
            $sumSubt +=  ($subt - $desc);

            if($article->category_id == 3){
               $guide = $dcotP->guide;
               $sumSubt += $guide->price;
            }

            $totalIva = $sumSubt * 1.16;
            //falta aplicar segundo descuento 

         }

         $arrCot = array('id'=>$cot->id,
                  'client_id'=>$cot->client_id,
                  'short_name'=>$cot->client->short_name,
                  'agent_performed_id'=>$cot->agent_performed_id,
                  'factura_id'=>'',
                  'reference'=>$cot->reference,
                  'name_agent'=>$cot->client->agent->name_agent,
                  'created_at'=>$cot->created_at,
                  'total'=>number_format($totalIva,2),
                  'status_name'=>$cot->status->status_name,
                  'status_id'=>$cot->status->id);

         array_push($arrGridCot,$arrCot);
      }

      return $arrGridCot;
   }
}
