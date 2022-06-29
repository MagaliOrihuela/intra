<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    Class CRate extends Model
    {
        public function service(){
            return $this->belongsTo(CService::class);
        }

        public function category(){
            return $this->belongsTo(CCategory::class);
        }

        public function range(){
            return $this->belongsTo(CRange::class);
        }

        public function guides(){
            return $this->hasMany(DGuide::class,'rate_id','id');
        }
    }

?>