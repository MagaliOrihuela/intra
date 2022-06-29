<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\CClients;
use App\Models\DAccessModules;
use App\Models\CAgents;

class CUser extends Authenticatable implements JWTSubject
{
   use Notifiable;


   public function getJWTIdentifier()
   {
      return $this->getKey();
   }

   /**
    * Return a key value array, containing any custom claims to be added to the JWT.
    *
    * @return array
    */
   public function getJWTCustomClaims()
   {
      return [];
   }

   
   public function detail() {

      return $this->hasOne(CClients::class, 'user_id', 'id');
   }
   
   public function accessModules() {

      return $this->hasMany(DAccessModules::class, 'user_id', 'id')
                  ->join('c_modules','d_access_modules.module_id','=','c_modules.id')
                  ->select('c_modules.id as module_id','c_modules.icon as icon','c_modules.if_sub_menu as if_submodulo','c_modules.route as route','c_modules.module as module')
                  ->orderBy('is_order','asc')
                  ->groupBy('c_modules.id');

   }

    public function accessSubModules() {
      
      return $this->hasMany(DAccessModules::class, 'user_id', 'id')
                  ->join('c_submodules','d_access_modules.submodule_id','=','c_submodules.id')
                  ->where('c_submodules.sub_module', '!=', 'General')
                  ->select('c_submodules.id as submodule_id','c_submodules.module_id as module_id','c_submodules.route as route','c_submodules.icon as subicon','c_submodules.sub_module as submodule');

    }


}
