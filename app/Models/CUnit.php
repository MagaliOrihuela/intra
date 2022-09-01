<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CProduct;

class CUnit extends Model
{
    // public function categories(){
    //     return $this->belongsToMany(CCategories::class);
    // }
    public function articles(){
        return $this->belongsToMany(CArticles::class,'c_articles_c_unit','unit_id','article_id');
    }

    public function dorders(){
        return $this->hasMany(DOrders::class,'unit_id','id');
    }

}