<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CCategory;
use App\Models\CModel;

class CProduct extends Model
{
   public function articles(){
      return $this->hasMany(CArticles::class,'product_id','id');
   }

   public function categories(){
      return $this->belongsToMany(CCategory::class,'c_categories_c_products','product_id','category_id');
   }

   // public function categories(){
   //    return $this->belongsTo(CCategory::class,'id','category_id');
   // }
   
   public function models(){
      return $this->belongsToMany(CModel::class,'c_products_c_models','product_id','model_id');
   }     
   
   
}
