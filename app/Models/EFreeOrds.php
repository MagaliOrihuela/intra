<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EFreeOrds extends Model
{
    public function dorders(){
        return $this->hasMany(DOrders::class,'free_id','id');
    }

    public function delitype(){
        return $this->belongsTo(CDeliveryType::class,'delivery_id','id');
    }

    public function deliserv(){
        return $this->belongsTo(CDeliveryServiceCompanies::class,'deli_serv_id','id');
    }

    public function board(){
        return $this->belongsTo(CBoardingType::class,'board_id','id');
    }

    public function destiny(){
        return $this->belongsTo(CShippingAddress::class,'destiny_id','id');
    }
}