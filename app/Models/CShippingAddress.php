<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CShippingAddress extends Model
{
    public function client(){
        return $this->belongsTo(CClients::class,'client_id','id');
    }
}
