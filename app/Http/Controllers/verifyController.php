<?php

namespace App\Http\Controllers;

use App\Models\ECotizaciones;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\QueryException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Http\Request;

class verifyController extends Controller
{
    public function verifyToken(Request $request) {

      try {

         if (! $user = JWTAuth::parseToken()->authenticate()) {
            return response()->json([ 'success'  => [ true ],'message' => ['user_not_found'] ], 404);
         } else {

            $tokenLoad =  JWTAuth::payload()->toArray();

            
            // obtenemos tiempo de inicio de sesion para comparar inactividad de usuario
            $date = new Carbon($request->date_log) ;
            $now = Carbon::now();

            // obtenemos los minutos transcurridos
            $diff = $date->diffInMinutes($now)*60;

            $secondLimits = 7200; // valor en segundos / limite de segundos sin actividad

            if($diff < $secondLimits) {

               return response()->json([
                  'success'  => true ,
                  'date_log'  => $now ,
               ], 200);

            } else {
               
               return response()->json([
                  'success'  => false ,
               ], 402);
            }
         }
   
      } catch (TokenExpiredException $ex) {

         // token expirado, logearce de nuevo
         return response()->json([
            'success'  => false,
            'message'  => 'Token expirado',
            'error'  => 'expired',
         ], 200);

      } catch (TokenBlacklistedException $ex) {

         // token enlista negra, logearce de nuevo
         return response()->json([
            'success'  => false,
            'message'  => 'Token en lista negra',
            'error'  => 'blacklist',
         ], 422);
      }

    } 

    public function verifyClientCotizacion(Request $request) {

      $result =  ECotizaciones::where( 'id', '=', $request->cotizacion_id )->first();
      $now = Carbon::now();

      if ($user = JWTAuth::parseToken()->authenticate()) {

         if($request->is_partner != 1 ) {
            
            if($request->client_id == $result->client_id){
               return response()->json([
                  'success'  => true,
                  'message' => 'Cotizacion valida',
                  'date_log'  => $now ,
               ], 200);

            } else {
               return response()->json([
                  'success'  => false,
                  'message' => 'Cotizacion Invalida',
                  'date_log'  => $now ,
               ], 200);
            }

         } else {
            
            return response()->json([
               'success'  => true,
               'message' => 'Partner Valido',
               'date_log'  => $now ,
            ], 200);

         }

      } else {
         return response()->json([
            'success'  => false,
            'message' => 'token Invalido',
            'date_log'  => $now ,
         ], 200);
      }
   }
}
