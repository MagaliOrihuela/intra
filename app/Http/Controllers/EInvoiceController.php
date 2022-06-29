<?php

namespace App\Http\Controllers;

use App\Models\EInvoice;
use App\Models\CDeliveryType;
use App\Models\CBoardingType;
use App\Models\CShippingAddress;
use App\Models\CDeliveryServiceCompanies;
use Illuminate\Http\Request;

class EInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\EInvoice  $eInvoice
     * @return \Illuminate\Http\Response
     */
    public function show(EInvoice $eInvoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EInvoice  $eInvoice
     * @return \Illuminate\Http\Response
     */
    public function edit(EInvoice $eInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EInvoice  $eInvoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EInvoice $eInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EInvoice  $eInvoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(EInvoice $eInvoice)
    {
        //
    }

    public function getConfigInvoice(Request $request)
    {
        // try {
            $DT = CDeliveryType::select('id','delivery_type','is_boarding','is_address')->where('is_active','=','1')->get();
            $BT = CBoardingType::select('id','boarding_type')->where('is_active','=','1')->get();
            $SA = CShippingAddress::select('id','client_id','contact_name','label','address_line','n_ext','n_int','suburb','city','state','cp','short_reference')
            // ->where('client_id',$request->client_id)
            ->get();
            $DSC = CDeliveryServiceCompanies::select('id','companie')
            ->where('is_active','=','1')
            ->orderBy("order")
            ->get();

            return response()->json([
                'success'        =>  true ,
                'delivery_type'  =>  $DT,
                'boarding_type'  =>  $BT,
                'shipping_address'  =>  $SA,
                'delivery_service_company'  =>  $DSC,
            ], 200);
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         'success' => false,
        //     ],401);
        // }

    }
}
