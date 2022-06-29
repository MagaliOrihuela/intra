<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\CUser;
use App\Models\CClients;
use Carbon\Carbon;

class LoginController extends Controller
{

   public function __construct(CUser $user)
   {
      $this->user = $user;
   }

   public function startSesion(Request $request)
   {

      // obtenemos las credenciales desde el front
      $credentials = $request->only('user_name','password');
      // llamamos el token al momento de autentificar
      $token = JWTAuth::attempt($credentials);
      // obtenemos el detalle del usuario 
      $user = JWTAuth::user();


      if($token) {

         $now = Carbon::now();

         $modulesUser = json_decode($user->accessModules, true);
         $submodulesUser =  json_decode($user->accessSubModules, true);

        // dd($modulesUser);

         CUser::where('id', $user->id)
         ->update([ 'is_login' => 1 ]);
         
         $AccesModule = self::ModulesAccess($modulesUser,$submodulesUser);

         if( $user->is_active == 1 ) {

            return response()->json([
               'success'       =>  true ,
               'message'       =>  'Iniciaste sesión correctamente',
               'user_name'     =>  $user->user_name,
               'client_id'     =>  $user->detail->client_id,
               'user_id'       =>  $user->id,
               'short_name'    =>  $user->detail->short_name,
               'email'         =>  $user->detail->email,
               'is_partner'    =>  $user->detail->is_partner,
               'user_img'      =>  $user->detail->user_img,
               'token'         =>  $token,
               'access_module' =>  $AccesModule,
               'date_log' => $now,

            ], 200)->header('Authorization', $token);

         }  else {

            return response()->json([
               'success'       =>  false ,
               'message'       =>  'Usuario desactivado, favor de llamar a su asesor de ventas',
            ], 200)->header('Authorization', $token);
            
         }

      } else {
          
         return response()->json([
            'success'       =>  false ,
            'message'       =>  'Usuario o contraseña no encontrados',
         ], 200)->header('Authorization', $token);
        
      }
   }

   public function moduleLogin(Request $request)
   {
      // obtenemos las credenciales desde el front
      $credentials = $request->only('user_name','password');
      // llamamos el token al momento de autentificar
      $token = JWTAuth::attempt($credentials);
      // obtenemos el detalle del usuario 
      $user = JWTAuth::user();

      if($token) {

         $now = Carbon::now();
         return response()->json([
            'success'       =>  true ,
            'user_name'     =>  $user->user_name,
            'short_name'    =>  $user->detail->short_name,
            'ip'           =>  $user->detail->is_partner,
            'user_img'      =>  $user->detail->user_img,
            'token'         =>  $token,
            'access_module' =>  $user->accessModules ,
            'date_log' => $now

         ], 200)->header('Authorization', $token);

      } else {
        return response()->json(['errors' => ['login' => [ true ]]], 422);
      }
   }

   public function refreshToken()
   {
      $token = JWTAuth::getToken();
      try {

         $token  = JWTAuth::refresh($token);
         return response()->json([
            'success'  => [ true ],
            'message'  => [ 'Token refrescado correctamente' ],
            'token'  => [ $token ],
         ], 200);

      } catch (TokenExpiredException $ex) {

         // token expirado, logearce de nuevo
         return response()->json([
            'success'  => [ false ],
            'message'  => [ 'Token expirado' ],
            'error'  => [ 'expired' ],
            'token'  => [ $token ],
         ], 200);

      } catch (TokenBlacklistedException $ex) {

         // token enlista negra, logearce de nuevo
         return response()->json([
            'success'  => [ false ],
            'message'  => [ 'Token en lista negra' ],
            'error'  => [ 'blacklist' ],
         ], 422);

      }
   }

   public function logout($user_id)
   {
     $token = JWTAuth::getToken();
     try {
        JWTAuth::invalidate($token);
        
         CUser::where('id', $user_id)
         ->update([ 'is_login' => 0 ]);

        return response()->json([
         'success'  => [ true ],
         'message'  => ['Te deslogeaste correctamente'],
         200
        ]);

     } catch ( JWTException $ex) {

         return response()->json([
         'success'  => [ false ],
         'message'  => ['Logout fallido'],
         422
        ]);
     }
   }

   
   public function validatePassword(Request $request)
   {
      $ps = json_decode(  CUser::select('password')
                        ->where('id','=',$request->user_id)
                        ->first() , true );

      if(Hash::check($request->password,$ps['password'])) { 
         return response()->json([
            'success'  => true,
         ],200 );
      } else {
         return response()->json([
            'success'  => false,
         ],200 );
      }
   }
   
   public function renewPassword(Request $request)
   {

      try {

         $ps = CUser::where('id','=',$request->user_id)
                           ->first();
        
         $ps->password = bcrypt($request->passwordNew);
         $ps->save();

            return response()->json([
               'success'  => true,
            ],200 );

      } catch (\Throwable $th) {

         return response()->json([
            'success'  => false,
         ],200 );

      }
   }
   
   public function saveImgProfile(Request $request)
   {

      try {

         $imgChng = CClients::where('user_id','=',$request->user_id)
                           ->first();

         $nameOld = $imgChng->user_img;
        
         $imgChng->user_img = $request->nameImg;
         $imgChng->save();

            return response()->json([
               'success'  => true,
               'name_img_old'  => $nameOld
            ],200 );

      } catch (\Throwable $th) {

         return response()->json([
            'success'  => false,
         ],200 );

      }
   }

   private function ModulesAccess($modulesUser,$submodulesUser) {

      $modulesAccess = array();

      foreach($modulesUser as $key => $value) {

         $modulesAccess = Arr::add($modulesAccess, $key, $value);
         $modulesAccess[$key] += ['access_submoduls' => ''];

         if((int)$value['if_submodulo'] === 1) {

            $modulesAccess[$key]['access_submoduls'] = array();

            foreach($submodulesUser as $key2 => $value2) {

               if( (int)$value2['module_id'] == (int)$value['module_id'] ) {

                  $submodule_id = $value2['submodule_id'];
                  $route = $value2['route'];
                  $submodule = $value2['submodule'];
                  $subicon = $value2['subicon'];

                  $submodulesAccess = array(
                     'submodule_id'=>$submodule_id,            
                     'route'=>$route,
                     'icon'=>$subicon,
                     'submodule'=>$submodule
                  );

                  array_push($modulesAccess[$key]['access_submoduls'], $submodulesAccess);

               }

            }

         }
      }

      return $modulesAccess;
   }

}
