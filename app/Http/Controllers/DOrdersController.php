<?php

namespace App\Http\Controllers;

use App\Models\CArticles;
use App\Models\CClients;
use App\Models\DOrders;
use App\Models\EfreeOrds;
use App\Models\CDeliveryType;
use App\Models\CBoardingType;
use App\Models\CCategory;
use App\Models\CDeliveryServiceCompanies;
use App\Models\CShippingAddress;
use App\Models\EOrders;
use Illuminate\Http\Request;
use DateTime;

class DOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $deliveryType = CDeliveryType::where('is_active','=',1)
                                    ->orderBy('id','desc')
                                        ->get();
        $boardType = CBoardingType::all();
        $deliveryComp = CDeliveryServiceCompanies::where('is_active','=',1)
                                    ->orderBy('order','asc')
                                        ->get();      
        return response()->json([
            'success' =>  true,
            'deliveryType' =>  $deliveryType,
            'boardType' => $boardType,
            'deliveryComp' => $deliveryComp,
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
    public function cateFree(Request $request)
    {
        $cate = CCategory::all();
        // categories del pedido
        $grid = $request->grid;
        $arrCate = array_unique(array_column($grid,'category'));
        $dOrd = EOrders::where('no_ped',$request->noPed)
                            ->get();

        if(!empty($dOrd)){

        }
        $gridCate = CCategory::select('id','category','icon','color')
                                    ->whereIn('category',$arrCate)
                                        ->get();
        $gridSel = $gridCate;
        $arrCate = [];        
        foreach($gridSel as $sel){
            array_push($arrCate,$sel->id);
        }
        
       
        return response()->json([
            'success' => true,
            'gridCate' => $gridCate,
            'selCate' => $arrCate
        ], 200);
    }
    
    public function address(Request $request)
    {
        $cte = CClients::Select('id')
                            ->where('client_id',$request->cveCte)
                                ->get();
        $c = $cte[0];
        $address = CShippingAddress::where('client_id',$c->id)
                            ->get();    
        $arrAddrss = [];
        foreach($address as $d){
            $arrTmp = array(
                "id" => $d['id'],
                "adrss" => $d->address_line.' No.'.$d->n_ext.' '.$d->n_int.',Col. '.$d->suburb.','.$d->city.','.$d->state
            );
            array_push($arrAddrss,$arrTmp);
        }
        return response()->json([
            'success' => true,
            'address' => $arrAddrss,
        ], 200);
    }

    public function freeOrder(Request $request){
        $eOrder = EOrders::where('no_ped',$request->no_ped)
                    ->get();
        if(empty($eOrder[0])){
            $order = new EOrders;
            $order->no_ped = $request->no_ped;
            $order->client_id = $request->clientId;
            $order->agent_id = $request->agentId;
            $order->status_id = 1;
            $order->total = $request->tot;
            $order->subtot = $request->subtot;
            $order->iva = $request->iva;
            $order->save();
            $orderId = $order->id;
        } else{
            $orderId = $eOrder[0]->id;
        }

        $array = [];
        $arrGrid = $request->gridDO;
        $arrSel = $request->selectC;
        $freeOrd = new EFreeOrds;
        $freeOrd->delivery_id = $request->selDelivery;
        $freeOrd->deli_serv_id = $request->selDeliCo;
        $freeOrd->board_id = $request->selBoard;
        $freeOrd->destiny_id = $request->selDestiny;
        $freeOrd->coment = $request->coment;
        $freeOrd->save();
        foreach($arrGrid as $grid){
            if($request->selParcial == 0 || in_array($grid['catId'],$arrSel)){
                $arti = CArticles::where('sai_id',$grid['cve_sai'])
                                    ->get();
                switch($grid['unidad']){
                    case 'PZA':
                    case 'PIEZA':$unitId = 1;
                        break;
                    case 'METRO':$unitId = 2;
                        break;
                    case 'ROLLO':$unitId = 3;
                        break;
                    case 'CAJA':$unitId = 6;
                        break;
                    case 'PAQ':$unitId = 7;
                        break;
                    default:$unitId = 8;
                        break;
                }
                $dOrd = new DOrders;
                $dOrd->order_id = $orderId;
                $dOrd->article_id = $arti[0]->id;
                $dOrd->unit_id = $unitId;
                $dOrd->status_id = 3;
                $dOrd->quantity = $grid['qty'];
                $dOrd->price = $grid['price'];
                $dOrd->free = 1;
                $dOrd->free_id = $freeOrd->id;
                $dOrd->save();

            }
        }
        return response()->json([
            'array' => 'olo'
        ],200);
    }
   

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DOrders  $DOrders
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        
    }
}
