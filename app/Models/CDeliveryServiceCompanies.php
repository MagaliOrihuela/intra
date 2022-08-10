<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CDeliveryServiceCompanies extends Model
{
    public function freeorder(){
        return $this->hasMany(EFreeOrds::class,'deli_serv_id','id');
    }
}
