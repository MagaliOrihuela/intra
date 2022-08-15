<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CClients extends Model
{
   public function user(){
      return $this->belongsTo(CClients::class,'id', 'user_id');
   }

   public function cotizador(){
      return $this->hasMany(CClients::class,'id', 'client_id');
   }

   public function cotizaciones(){
      return $this->hasMany(ECotizaciones::class,'client_id','id');
   }

   public function agent(){
      return $this->belongsTo(CAgents::class,'agent_id','id');
   }

   public function categorycte(){
      return $this->belongsTo(CCategoriesCte::class,'category_cte_id','id');
   }

   public function orders(){
      return $this->hasMany(EOrders::class,'id','client_id');
   }

   public function shippings(){
      return $this->hasMany(CShippingAddress::class,'id','client_id');
   }

}
