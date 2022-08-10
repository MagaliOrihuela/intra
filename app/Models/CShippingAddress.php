<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CShippingAddress extends Model
{
    public function freeorder(){
        return $this->hasMany(EFreeOrds::class,'destiny_id','id');
    }}
