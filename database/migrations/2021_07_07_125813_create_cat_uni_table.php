<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCatUniTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cat_uni', function (Blueprint $table) {
            $table->bigInteger('category_id')->unsigned();
            $table->integer('unit_id')->unsigned();

            $table->foreign('category_id')->references('id')->on('c_categories');
            $table->foreign('unit_id')->references('id')->on('c_units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cat_uni');
    }
}
