<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CProduct;

class CModel extends Model
{
   public function articles(){
      return $this->hasMany(CArticles::class,'model_id','id');
   }

   public function products(){
      return $this->belongsToMany(CProduct::class,'c_products_c_models','model_id','product_id');
   }     

   /*
   public function products(){
      return $this->belongsTo(CProduct::class,'id','product_id','is_all')
      ->orderBy('is_all', 'DESC',)
      ->orderBy('id', 'ASC');
   }     */    
}
