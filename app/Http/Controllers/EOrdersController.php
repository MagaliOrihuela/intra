<?php

namespace App\Http\Controllers;

use App\Models\CClients;
use App\Models\CStatusOrds;
use App\Models\EOrders;
use Illuminate\Http\Request;
use DateTime;

class EOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function freeOrders(Request $request)
    {
        $eOrders = EOrders::where('status_id',1)
                            ->with('client:id,client_id,short_name')
                            ->with('agent:id,agent,name_agent')
                                ->get();
        $CStatus = CStatusOrds::whereIn('id',[3,4])
                                ->get();
        $statusF = $CStatus[0];
        $statusS = $CStatus[1];
        $gridOrders = [];
        $status = '';
        foreach($eOrders as $order){
            if($order->free == 1){
                $color = $statusS->color;
            } else{
                $status = $statusF->name;
                $color = $statusF->color;
            }

            $grid = array(
                'id' => $order->id,
                'no_ped' => $order->no_ped,
                'client' => $order->client->client_id,
                'nameCte' => $order->client->short_name,
                'nameAgt' => $order->agent->agent,
                'created' => $order->created_at,
                'total' => $order->total,
                'free' => $order->free,
                'status' => $status,
                'color' => $color
            );
            array_push($gridOrders,$grid);
        }
        
        return response()->json([
            'success' =>  true,
            'dataOrders' => $gridOrders,
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

    /**
     * Display the specified resource.
     *
     * @param  \App\ECotizaciones  $eCotizaciones
     * @return \Illuminate\Http\Response
     */

    public function show(EOrders $eCot)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\EOrders  $EOrders
     * @return \Illuminate\Http\Response
     */
    public function edit(EOrders $EOrders)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EOrders  $EOrders
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EOrders $EOrders)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EOrders  $EOrders
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        
    }
}
