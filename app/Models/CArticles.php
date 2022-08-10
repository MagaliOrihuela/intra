<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CArticles extends Model
{
    public function category(){
        return $this->belongsTo(CCategory::class,'category_id','id');
    }

    public function product(){
        return $this->belongsTo(CProduct::class,'product_id','id');
    }

    public function model(){
        return $this->belongsTo(CModel::class,'model_id','id');
    }

    public function cotizaciones(){
        return $this->hasMany(DCotizaciones::class,'id','article_id');
    }
    public function dorders(){
        return $this->hasMany(DOrders::class,'id','article_id');
    }

    public function units(){
        return $this->belongsToMany(CUnit::class,'c_articles_c_unit','article_id','unit_id');
    }

    // public function guides(){
    //     return $this->hasMany(DGuide::class,'article_id','id');
    // }
}
