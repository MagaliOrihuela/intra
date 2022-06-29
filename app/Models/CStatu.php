<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CStatu extends Model
{
    public function cotizaciones(){
        return $this->hasMany(ECotizaciones::class,'status_id','id');
    }
}
