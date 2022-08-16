<?php

namespace App\Http\Controllers;

use App\Models\CClients;
use App\Models\EFreeOrds;
use Illuminate\Http\Request;
use DateTime;

class EFreeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function freeOrders(Request $request)
    {
        $eFree = EFreeOrds::select('e_free_ords.id','e_free_ords.coment','e_free_ords.created_at','e_orders.no_ped','c_clients.client_id','c_clients.short_name','c_agents.name_agent','c_status_ords.name','c_status_ords.color')
                            ->join('d_orders','d_orders.free_id','e_free_ords.id')
                            ->join('e_orders','e_orders.id','d_orders.order_id')
                            ->join('c_clients','c_clients.id','e_orders.client_id')
                            ->join('c_agents','c_agents.id','e_orders.agent_id')
                            ->join('c_status_ords','c_status_ords.id','e_free_ords.status_id')
                                ->where('e_free_ords.status_id',1)
                                    ->groupBy('e_free_ords.id','e_orders.no_ped')
                                        ->get();
        
        return response()->json([
            'success' =>  true,
            'dataF' => $eFree,
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
