<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    Class CService extends Model
    {
        public function rates(){
            return $this->hasMany(CRate::class);
        }
    }

?>