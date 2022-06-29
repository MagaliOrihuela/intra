<?php

namespace App\Http\Controllers;

use App\Models\CClients;
use App\Models\CUser;
use App\Models\CModules;
use App\Models\CSubmodules;
use App\Models\DAccessModules;
use App\Models\CAgents;
use Illuminate\Http\Request;

class CClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cClients = CClients::where('is_partner','=','0')->get();


        return response()->json([
            'success'        =>  true ,
            'cClients'  =>  $cClients,
        ], 200);

    }

    public function fullClient()
    {
        $cClients = CClients::get();
        $agents = CAgents::select('id','name_agent')->where('is_active','=','1')->get();

        return response()->json([
            'success'  => true ,
            'cClients' => $cClients,
            'agents' => $agents,
        ], 200);

    }

    public function vClient(Request $request)
    {
        $client     = CClients::where('user_id','=',$request->user_id)->get();
        $user       = CUser::select('id','password','user_name')->where('id','=',$request->user_id)->get();
        $modules    = CModules::select('id','module','icon')->get();
        $submodules = CSubmodules::select('id','module_id','sub_module','icon')->where('sub_module','!=','General')->get();

        $selectModules = json_decode( DAccessModules::select('c_modules.id')
            ->join('c_modules', 'c_modules.id', '=', 'd_access_modules.module_id')
            ->join('c_submodules', 'c_submodules.id', '=', 'd_access_modules.submodule_id')
            ->Where('d_access_modules.user_id', $request->user_id)
            ->Where('c_submodules.sub_module', '=', 'General')
            ->get() ,true );

        foreach($selectModules as $key => $value) { $selectModules[$key] = $value['id']; }

        $selectSubModules = json_decode(  DAccessModules::select('c_submodules.id')
            ->join('c_submodules', 'c_submodules.id', '=', 'd_access_modules.submodule_id')
            ->Where('d_access_modules.user_id', $request->user_id)
            ->Where('c_submodules.sub_module', '!=', 'General')
            ->get() ,true );
            
        foreach($selectSubModules as $key => $value) { $selectSubModules[$key] = $value['id']; }
         
        return response()->json([
            'success'        =>  true ,
            'client'  =>  $client[0],
            'user'  =>  $user[0],
            'modules'  =>  $modules,
            'selectModules'  =>  $selectModules,
            'submodules'  =>  $submodules,
            'selectSubModules'  =>  $selectSubModules,
        ], 200);

    }

    public function savePermissions(Request $request)
    {


        try {
            
            // eliminamos los accesos actuales del usuario para agregar los nuevos
            $delAccess= DAccessModules::where('user_id','=',(int)$request->user_id)->delete();

            // ingresamos los modulodos a los que tenemos permisos

            foreach( $request->modules as $key => $value) {
                // obtenemos el general del sub_modelo para darle permiso al modulo 
                $submodule = CSubmodules::select('id')
                            ->where('module_id','=',$value)
                            ->where('sub_module','=','General')
                            ->first();

                $access = new DAccessModules();
                $access->user_id = (int)$request->user_id;
                $access->module_id = (int)$value;
                $access->submodule_id = (int)$submodule['id'];
                $access->save();
            }

            // ingresamos los submodulos a los que tenemos accesos

            foreach( $request->submodules as $key => $value) {
                // obtenemos el general del sub_modelo para darle permiso al modulo 
                $submodule = CSubmodules::select('module_id')
                            ->where('id','=',$value)
                            ->first();

                $access = new DAccessModules();
                $access->user_id = (int)$request->user_id;
                $access->module_id = (int)$submodule['module_id'];
                $access->submodule_id = (int)$value;
                $access->save();
                            
            }

            return response()->json([
                'success'        =>  true ,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success'        =>  false ,
            ], 200);
        }
    }

    public function saveDataGeneral(Request $request)
    {

        try {
            
            // Actualizamos la informacion proporcionada

                $clients = CClients::where('user_id','=',$request->user_id)->first();
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

    public function saveCredentials(Request $request)
    {

        try {
            
            // Actualizamos la informacion proporcionada
            $ps = CUser::where('id','=',$request->user_id)
                           ->first();
                           
            if( $request->password_user != null) { $ps->password = bcrypt($request->password_user); }
            $ps->user_name = $request->user_name;
            $ps->save();

            return response()->json([
                'success'        =>  true,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success'        =>  false ,
            ], 200);
        }

    }

    public function activeordeactiveClient(Request $request)
    {

        try {
            
            // eliminamos el inicio de sesion del usuario
            $cuser = CUser::where('id','=',$request->user_id)->first();
            $cuser->is_active = $request->is_active;
            $cuser->save();

            // desactivamos su cuenta y sus datos de c_client
            $clients = CClients::where('user_id','=',$request->user_id)->first();
            $clients->is_active = $request->is_active;
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

    
}
