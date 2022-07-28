<?php

namespace App\Models;

use App\Models\CClients;
use App\Models\CAgents;
use Illuminate\Database\Eloquent\Model;

class EOrders extends Model
{

    public function client() {
        return $this->belongsTo(CClients::class, 'client_id', 'id')
                        ->select(array('id','user_id','client_id','short_name','agent_id','category_cte_id'));
    }
    
    public function agent() {
        return $this->hasOne(CAgents::class, 'agent_id', 'id');
    } 
   
    // public function dcotizaciones(){
    //     return $this->hasMany(DCotizaciones::class,'cotizacion_id','id');
    // }

    // public function status(){
    //     return $this->belongsTo(CStatu::class,'status_id','id');
    // }
}

