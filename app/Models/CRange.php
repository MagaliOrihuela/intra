<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    
    Class CRange extends Model
    {
        public function rates(){
            return $this->hasMany(CRate::class,'range_id','id');
        }

        public function states(){
            return $this->hasMany(CState::class,'range_id','id');
        }

    }

?>