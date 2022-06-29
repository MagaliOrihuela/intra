<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CProduct;

class CCategory extends Model
{
   public function articles(){
      return $this->hasMany(CArticles::class,'category_id','id');
   }

   public function products(){
      return $this->belongsToMany(CProduct::class,'c_categories_c_products','category_id','product_id');
   } 

   public function rates(){
      return $this->hasMany(CRate::class,'category_id','id');
   }
}
