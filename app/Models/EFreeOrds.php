<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EFreeOrds extends Model
{
    public function dorder(){
        return $this->belongsTo(DOrders::class,'free_id','id');
    }
}