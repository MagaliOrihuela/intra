<?php

namespace App\Http\Controllers;

use App\Models\CClients;
use App\Models\EOrders;
use Carbon\Carbon;
use Facade\FlareClient\Http\Client;
use Illuminate\Http\Request;
use DateTime;

class EOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, EOrders $eOrders)
    {
        // $getis_parter = $request->partner;
        // $getclient_id = $request->client_id;
        // $edCot = $eCotizaciones::with('status:id,status_name')
        //     ->with('client')
        //     ->with('client.agent:id,name_agent')
        //     ->with('dcotizaciones')
        //     ->with('dcotizaciones.article:id,article,category_id,packing1,packing2')
        //     ->with('dcotizaciones.guide:id,d_cot_id,price')
        //     ->where('status_id', '<>', '4')
        //     ->where(function ($query) use ($getis_parter, $getclient_id) {
        //         if ($getis_parter == 0) {
        //             $query->where('client_id', $getclient_id);
        //         }
        //     })
        //     ->get(['id', 'client_id', 'status_id', 'reference', 'factura_id', 'agent_performed_id', 'created_at', 'updated_at']);
        // $hoy = new DateTime('now');
        // foreach ($edCot as $cotv) { //escapamos cada cotización
        //     $dateCot = new DateTime($cotv->updated_at); //$eCot->created_at
        //     $dateDif = $dateCot->diff($hoy);
        //     $days = $dateDif->format('%d');
        //     //si la cotización es mayor a 3 días se cancela
        //     if ($days >= 3) {
        //         $canCot = ECotizaciones::find($cotv->id);
        //         $canCot->status_id = 4;
        //         $canCot->save();
        //     }
        // }
        // $arrGridCot = $this->dataPriceCot($edCot);
        return response()->json([
            'success' =>  true,
            'pruba' =>  "olo",
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

    // public function dataCotizacion(Request $request)
    // {
    //     try {
    //         $datacotizacion = ECotizaciones::select('e_cotizaciones.client_id', 'e_cotizaciones.reference', 'e_cotizaciones.payment_method_id', 'c_payment_methods.payment_method', 'e_cotizaciones.account_number', 'e_cotizaciones.cfdi_id', 'c_cfdis.cfdi_name', 'e_cotizaciones.delivery_type_id', 'c_delivery_types.delivery_type', 'e_cotizaciones.boarding_type_id', 'c_boarding_types.boarding_type', 'e_cotizaciones.shipping_address_id', 'c_shipping_addresses.label', 'c_shipping_addresses.address_line', 'c_shipping_addresses.cp', 'c_shipping_addresses.n_ext', 'c_shipping_addresses.n_int', 'c_shipping_addresses.suburb', 'c_shipping_addresses.city', 'c_shipping_addresses.state', 'e_cotizaciones.delivery_service_compani_id', 'c_delivery_service_companies.companie', 'e_cotizaciones.created_at', 'c_clients.is_factura', 'c_clients.full_name', 'e_cotizaciones.is_facturado')
    //                                         ->join('c_clients', 'c_clients.id', '=', 'e_cotizaciones.client_id')
    //                                         ->join('c_payment_methods', 'c_payment_methods.id', '=', 'e_cotizaciones.payment_method_id')
    //                                         ->join('c_cfdis', 'c_cfdis.id', '=', 'e_cotizaciones.cfdi_id')
    //                                         ->leftjoin('c_delivery_types', 'c_delivery_types.id', '=', 'e_cotizaciones.delivery_type_id')
    //                                         ->leftjoin('c_boarding_types', 'c_boarding_types.id', '=', 'e_cotizaciones.boarding_type_id')
    //                                         ->leftjoin('c_shipping_addresses', 'c_shipping_addresses.id', '=', 'e_cotizaciones.shipping_address_id')
    //                                         ->leftjoin('c_delivery_service_companies', 'c_delivery_service_companies.id', '=', 'e_cotizaciones.shipping_address_id')
    //                                             ->where('e_cotizaciones.id', $request->id)->first();

    //         return response()->json([
    //             'success' => true,
    //             'datacotizacion' => $datacotizacion,
    //         ], 200);
    //     } catch (\Throwable $th) {

    //         return response()->json([
    //             'success' => false,
    //         ], 200);
    //     }
    // }
}
