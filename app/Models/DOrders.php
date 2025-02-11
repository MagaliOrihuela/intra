<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DOrders extends Model
{
    public function order(){
        return $this->belongsTo(EOrders::class,'order_id','id');
    }
    
    public function article(){
        return $this->belongsTo(CArticles::class,'article_id','id');
    }

    public function unit(){
        return $this->belongsTo(CUnit::class,'unit_id','id');
    }

    public function freeOrder(){
        return $this->belongsTo(EFreeOrders::class,'free_id','id');
    }
}