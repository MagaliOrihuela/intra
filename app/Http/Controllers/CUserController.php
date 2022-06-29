<?php

namespace App\Http\Controllers;
use App\Models\CUser;
use App\Models\CModules;
use App\Models\CSubmodules;
use App\Models\CAgents;
use App\Models\CClients;

use Illuminate\Http\Request;

class CUserController extends Controller
{
    
    public function saveNewCredentials(Request $request)
    {
        try {
            
            // Actualizamos la informacion proporcionada
            $user = new CUser();
            $user->user_name = $request->user_name;
            $user->password = bcrypt($request->password_user);
            $user->save();
            $user_id = $user->id;

            return response()->json([
                'success' =>  true,
                'user_id' =>  $user_id,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success'        =>  false ,
            ], 200);
        }
    }

    
    public function saveNewDataGeneral(Request $request)
    {

        try {
            
            // Actualizamos la informacion proporcionada

                $clients = new CClients();
                $clients->user_id = $request->user_id;
                $clients->short_name = $request->short_name;
                $clients->full_name = $request->full_name;
                $clients->client_id = $request->client_id;
                $clients->company = $request->company_name;
                $clients->email = $request->clien_email;
                $clients->phone = $request->client_phone;
                $clients->desc1 = $request->client_discount;
                $clients->agent_id = $request->agent_client;
                $clients->is_partner = $request->is_Partner;
                $clients->is_factura = $request->is_factura;
                $clients->save();

            return response()->json([
                'success'        =>  true ,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success'        =>  false ,
            ], 200);
        }

    }

    
    public function searchDataNewAccount(Request $request)
    {
        $modules    = CModules::select('id','module','icon')->get();
        $submodules = CSubmodules::select('id','module_id','sub_module','icon')->where('sub_module','!=','General')->get();
        $agents = CAgents::select('id','name_agent')->where('is_active','=','1')->get();

        return response()->json([
            'success'        =>  true ,
            'modules'  =>  $modules,
            'submodules'  =>  $submodules,
            'agents'  =>  $agents,
        ], 200);

    }

}
