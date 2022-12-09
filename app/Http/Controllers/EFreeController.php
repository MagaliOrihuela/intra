<?php

namespace App\Http\Controllers;

use App\Models\EFreeOrds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EFreeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function freeOrders(Request $request)
    {
        $eFree = DB::select("call ps_orders(1,0,$request->user_id)");
        $gridEF = collect($eFree);
        $arrTmp = [];
        foreach($gridEF as $row){
            if($row->sumT > 0 || $row->sumR > 0 || $row->sumC > 0 
                || $row->sumP > 0 || $row->sumM > 0 || $row->sumTd > 0){
                array_push($arrTmp,$row);
            }
        }
                                
        return response()->json([
            'success' =>  true,
            'dataF' => $arrTmp,
        ], 200);
    }
    public function freeOrdersChk(Request $request)
    {
        $eFree = EFreeOrds::select('e_free_ords.id','e_free_ords.coment','c_delivery_types.delivery_type','c_delivery_service_companies.companie','c_boarding_types.boarding_type','e_free_ords.created_at','e_orders.no_ped','c_clients.client_id','c_clients.short_name','c_agents.name_agent','c_status_ords.name','c_status_ords.color')
                            ->join('d_orders','d_orders.free_id','e_free_ords.id')
                            ->join('e_orders','e_orders.id','d_orders.order_id')
                            ->join('c_clients','c_clients.id','e_orders.client_id')
                            ->join('c_agents','c_agents.id','e_orders.agent_id')
                            ->join('c_status_ords','c_status_ords.id','e_free_ords.status_id')
                            ->join('c_delivery_types','c_delivery_types.id','e_free_ords.delivery_id')
                            ->join('c_delivery_service_companies','c_delivery_service_companies.id','e_free_ords.deli_serv_id')
                            ->join('c_boarding_types','c_boarding_types.id','e_free_ords.board_id')
                                ->where('e_free_ords.status_id',4)
                                    ->groupBy('e_free_ords.id','e_orders.no_ped')
                                        ->get();

        return response()->json([
            'success' =>  true,
            'dataFChk' => $eFree,
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
}

// call procedures
// $eFree = DB::select('call ps_pruba()');
// $prub = collect($eFree);

