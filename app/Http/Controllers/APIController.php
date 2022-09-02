<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

class APIController extends Controller
{
    public function createToken(Request $request )
    {
        try {
            $response = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/create_token.php', [
                'token' => $request->token,
                'user_id' => $request->user_id,
            ]);
            return response()->json([
                'success' => true,
                'response' => $response->json(),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function invoicesGetAll(Request $request)
    {
        try {
            $invoiceData = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/facturas/all.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
            ]);
            return response()->json([
                'success' => true,
                'invoiceData' => $invoiceData->json(),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function releaseInvoice(Request $request)
    {
        try {
            $invoiceID = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/facturas/release.php' , [
                'token' => $request->token,
                'invoice_id' => $request->invoiceId,
            ]);
            return response()->json([
                'success' => true,
                'invoiceID' => $invoiceID->json(),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function ordersAll(Request $request)
    {
        try {
            $dataOrders = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/orders/getOrders.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
            ]);
            return response()->json([
                'success' => true,
                'dataOrders' => $dataOrders->json(),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function ordersAllS(Request $request)
    {
        try {
            $dataOrders = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/orders/getOrdersS.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
            ]);
            return response()->json([
                'success' => true,
                'dataOrders' => $dataOrders->json(),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function ordersAllC(Request $request)
    {
        try {
            $dataOrders = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/orders/getOrdersC.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
            ]);
            return response()->json([
                'success' => true,
                'dataOrders' => $dataOrders->json(),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function orderParts(Request $request)
    {
        try {
            $dataOrdPart = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/orders/getOrderParts.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
                'no_ped' => $request->no_ped,
                'flgFree' => 0
            ]);

            return response()->json([
                'success' => true,
                'dataOrdPart' => $dataOrdPart->json()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function freeOrder(Request $request)
    {
        try {
            $dataOrdPart = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/orders/freeOrder.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
                'no_ped' => $request->no_ped
            ]);
            return response()->json([
                'success' => true,
                'dataOrdPart' => $dataOrdPart->json()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function supplyScan(Request $request)
    {
        try {
            $dataSuppScan = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/supply/supplyScan.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
                'dord_id' => $request->dord_id,
                'cat_id' => $request->cat_id,
                'lot' => $request->lot
            ]);
            return response()->json([
                'success' => true,
                'dataSuppScan' => $dataSuppScan->json()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
            ], 200);
        }
    }
    public function gridsModal(Request $request)
    {
        try {
            $gridSupplyModal = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/supply/gridsModal.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
                'dordId' => $request->dordId,
            ]);
            return response()->json([
                'success' => true,
                'gridSupplyModal' => $gridSupplyModal->json()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => "fails",
            ], 200);
        }
    }
    public function supplyDelScan(Request $request)
    {
        try {
            $gridSupplyModal = HTTP::asForm()->post(config('app.ApiUrl').'/API/shades/supply/supplyDelScan.php' , [
                'token' => $request->token,
                'user_id' => $request->user_id,
                'dord_id' => $request->dord_id,
                'cat_id' => $request->cat_id,
                'dordLot' => $request->dordLot
            ]);
            return response()->json([
                'success' => true,
                'gridSupplyModal' => $gridSupplyModal->json()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => "fails",
            ], 200);
        }
    }
}
