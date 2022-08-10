<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CBoardingType extends Model
{
    public function freeorder(){
        return $this->hasMany(EFreeOrds::class,'board_id','id');
    }
}
