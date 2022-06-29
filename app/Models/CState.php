<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class CState extends Model{

        public function range(){
            return $this->belongsTo(CRange::class);
        }

    }

?>