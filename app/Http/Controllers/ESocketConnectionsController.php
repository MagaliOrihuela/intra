<?php

namespace App\Http\Controllers;

use App\Models\ESocketConnections;
use Illuminate\Http\Request;

class ESocketConnectionsController extends Controller
{
   /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
       $users = ESocketConnections::select('user_id','is_partner','socket_id')->get();
       // return $eCot;
 
       return response()->json([
          'success'        =>  true ,
          'users'  =>  $users,
       ], 200);
 
    }

   /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */

    public function store(Request $request)
    {
       
       // Guardamos el Socket id conectado
       try {
          
          $socketNew = new ESocketConnections;
          $socketNew->user_id  = $request->user_id;
          $socketNew->is_partner = $request->is_partner;
          $socketNew->socket_id  = $request->socket_id;
          $socketNew->save();
          return response()->json([ 'success' => true ], 200); 
       } catch (\Exception $e) {
          
          dd($e);
          return response()->json([ 'success' => false ], 405); 
       }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DCotizaciones  $dCotizaciones
     * @return \Illuminate\Http\Response
     */
   public function update(Request $request)
   {

      
      try {



         ESocketConnections::where('socket_id', $request->socket_id_old)
         ->where('user_id',$request->user_id)
         ->update(['socket_id' => $request->socket_id_new]);
         return response()->json([ 'success' => true ], 200); 

      } catch (\Exception $e) {
          
         dd($e);
         return response()->json([ 'success' => false ], 405); 
      }
   }

    
   /**
    * Remove the specified resource from storage.
    *
    * @param  \App\ECotizaciones  $eCotizaciones
    * @return \Illuminate\Http\Response
    */
   public function destroy($socket_id)
   {
      $socket = ESocketConnections::where('socket_id',$socket_id);
      $socket->delete();
   }
}
