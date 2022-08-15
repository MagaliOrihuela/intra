<?php

namespace App\Http\Controllers;

use App\Models\DCotizaciones;
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
        $boardType = CBoardingType::where('is_active','=',1)
                                    ->get();
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
        //verificar si el cliente está dado de alta en la web
        $cte = CClients::Select('id')
                            ->where('client_id',$request->cveCte)
                                ->get();
        $gridCate = [];
        $selCate = [];
        $disFree = true;
        if(empty($cte[0])){
            $flg = 1;
        } else{
            $flg = 0;
            $arrCate = [];        
            // categories del pedido
            foreach($request->grid as $grid){
                if(trim($grid['free']) == ''){
                    array_push($arrCate,$grid['category']);
                    if(!in_array(intval($grid['catId']),$selCate)){
                        array_push($selCate,intval($grid['catId']));
                    }
                }
            }
            if(!empty($arrCate)){
                $gridCate = CCategory::select('id','category','icon','color')
                                        ->whereIn('category',array_unique($arrCate))
                                            ->get();
                $disFree = false;
            }
        }
        return response()->json([
            'success' => true,
            'flg' => $flg,
            'gridCate' => $gridCate,
            'selCate' => $selCate,
            'disFree' => $disFree
        ], 200);
    }
    
    public function address(Request $request)
    {
        $cte = CClients::Select('id')
                            ->where('client_id',$request->cveCte)
                                ->get();
        $arrAddrss = [];
        if(empty($cte[0])){
            $flg = 1;
        } else{
            $c = $cte[0];
            $address = CShippingAddress::where('client_id',$c->id)
                                ->get();    
            foreach($address as $d){
                $arrTmp = array(
                    "id" => $d['id'],
                    "adrss" => $d->address_line.' No.'.$d->n_ext.' '.$d->n_int.',Col. '.$d->suburb.', cp. '.$d->cp.', '.$d->city.','.$d->state,
                    "contact" => $d->contact_name

                );
                array_push($arrAddrss,$arrTmp);
            }
            $arrTmp = array(
                "id" => 0,
                "adrss" => 'Otra dirección...',
                "contact" => ''
            );
            array_push($arrAddrss,$arrTmp);


            $flg = 0;
        }
        
        return response()->json([
            'success' => true,
            'flg' => $flg,
            'address' => $arrAddrss,
        ], 200);
    }

    public function freeOrder(Request $request){
        $eOrder = EOrders::where('no_ped',$request->no_ped)
                    ->get();
        $client = CClients::where('client_id',$request->clientId)
                            ->get();
        if(empty($eOrder[0])){
            $order = new EOrders;
            $order->no_ped = $request->no_ped;
            $order->client_id = $client[0]->id;
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
        $arrGrid = $request->gridDO;
        $arrSel = $request->selectC;
        $contact = '';
        $street = '';
        $extNum = '';
        $intNum = '';
        $cp = '';
        $suburb = '';
        $city = '';
        $state = '';
        $phone = '';
        if($request->selDelivery <> 3 && $request->selDestiny == 0){
            $contact = $request->contact;
            $street = $request->street;
            $extNum = $request->extNum;
            $intNum = $request->intNum;
            $cp = $request->cp;
            $suburb = $request->suburb;
            $city = $request->city;
            $state = $request->state;
            $phone = $request->phone;
        } else if($request->selDelivery <> 3){
            $address = CShippingAddress::join('c_clients','c_clients.id','c_shipping_addresses.client_id')
                                        ->where('c_clients.client_id',$request->clientId)
                                            ->get();   
            $addrss = $address[0];
            $contact = $addrss->contact_name;
            $street = $addrss->address_line;
            $extNum = $addrss->n_ext;
            $intNum = $addrss->n_int;
            $cp = $addrss->cp;
            $suburb = $addrss->suburb;
            $city = $addrss->city;
            $state = $addrss->state; 
            $phone = $addrss->phone;
        }
        $freeOrd = new EFreeOrds;
        $freeOrd->delivery_id = $request->selDelivery;
        $freeOrd->deli_serv_id = $request->selDeliCo <> null ? $request->selDeliCo : 0;
        $freeOrd->board_id = $request->selBoard <> null ? $request->selBoard : 0;
        $freeOrd->contact = $contact;
        $freeOrd->street = $street;
        $freeOrd->extNum = $extNum;
        $freeOrd->intNum = $intNum;
        $freeOrd->cp = $cp;
        $freeOrd->suburb = $suburb;
        $freeOrd->city = $city;
        $freeOrd->state = $state;
        $freeOrd->phone = $phone;
        $freeOrd->coment = $request->coment;
        $freeOrd->user_id = $request->user_id;
        $freeOrd->save();

        foreach($arrGrid as $grid){
            if(in_array($grid['catId'],$arrSel)){
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
                $dOrd->status_id = 1;
                $dOrd->quantity = $grid['qty'];
                $dOrd->price = $grid['price'];
                $dOrd->free_id = $freeOrd->id;
                $dOrd->fol_prod = $grid['fol_prod'];
                $dOrd->save();
            }
        }
        return response()->json([
            'success' => true,
            'orderId' => $orderId,
            'no_ped' => $request->no_ped
        ],200);
    }

    public function freeDetail(Request $request){
        $free = EfreeOrds::select('e_free_ords.*','e_free_ords.created_at','c_delivery_types.delivery_type','c_delivery_service_companies.companie','c_boarding_types.boarding_type')
                            ->join('c_delivery_types','c_delivery_types.id','e_free_ords.delivery_id')
                            ->join('c_delivery_service_companies','c_delivery_service_companies.id','e_free_ords.deli_serv_id')
                            ->join('c_boarding_types','c_boarding_types.id','e_free_ords.board_id')
                            ->join('d_orders','d_orders.free_id','e_free_ords.id')
                                ->where('d_orders.order_id',$request->orderId)
                                    ->groupBy('e_free_ords.id')
                                        ->get();
        $arrFree = [];
        foreach($free as $f){
            $destiny = '';
            if(trim($f->street) <> '' || $f->street <> null){
                $int = $f->intNum <> null ? ', int: '.$f->intNum : '';
                $destiny = 'calle '.$f->street.' '.$f->extNum.$int.', '.$f->suburb.', '.$f->cp.', '.$f->city.
                            ', '.$f->state;
            }
            $groups = CCategory::select('c_categories.id as idC','c_categories.category','c_categories.color','c_categories.icon')
                                ->join('c_articles','c_articles.category_id','c_categories.id')
                                ->join('d_orders','d_orders.article_id','c_articles.id')
                                    ->where('d_orders.free_id',$f->id)
                                        ->groupBy('c_categories.id')
                                            ->orderBy('c_categories.id')
                                                ->get();
            $tmp = array(
                'id'=> $f->id,
                'deli'=> $f->delivery_type,
                'deliserv'=> $f->companie,
                'board'=> $f->boarding_type,
                'destiny'=> $destiny,
                'coment'=> $f->coment,
                'created_at'=> $f->created_at,
                'arrGroups' => $groups
            );
            array_push($arrFree,$tmp);
        }
        return response()->json([
            'success' => true,
            'arrFree' => $arrFree ,
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
