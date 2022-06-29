<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use App\Models\CClients;

    Class CCategoriesCte extends Model
    {
        public function client(){
            return $this->hasMany(CClients::class,'category_cte_id','id');
        }

    }

?>