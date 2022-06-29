<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DCotizaciones extends Model
{
    public function article(){
        return $this->belongsTo(CArticles::class,'article_id','id');
    }

    public function cotizacion(){
        return $this->belongsTo(ECotizaciones::class,'cotizacion_id','id');
    }

    public function guide(){
        return $this->hasOne(DGuide::class,'d_cot_id','id');
    }
}
