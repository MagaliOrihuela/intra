<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CDeliveryType extends Model
{
    public function freeorder(){
        return $this->hasMany(EFreeOrds::class,'delivery_id','id');
    }
}
