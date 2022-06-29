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
}
