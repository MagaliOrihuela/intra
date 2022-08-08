<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CAgents extends Model
{
   
   public function cotizador(){
      return $this->belongsTo(CAgents::class,'id', 'client_id');
   }

   public function clients(){
      return $this->hasMany(CClients::class,'agent_id','id');
   }

   public function orders(){
      return $this->hasMany(EOrders::class,'client_id','id');
   }

}
