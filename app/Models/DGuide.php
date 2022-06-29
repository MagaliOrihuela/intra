<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class DGuide extends Model{
        
        public function dcotizacion(){
            return $this->belongsTo(DCotizaciones::class,'d_cot_id','id');
        }

        public function rate(){
            return $this->belongsTo(CRate::class);
        }

    }

?>