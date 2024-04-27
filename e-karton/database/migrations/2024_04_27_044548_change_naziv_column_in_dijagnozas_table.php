<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeNazivColumnInDijagnozasTable extends Migration
{
    public function up()
    {
        Schema::table('dijagnozas', function (Blueprint $table) {
            
            $table->text('naziv')->change();
        });
    }

    public function down()
    {
        Schema::table('dijagnozas', function (Blueprint $table) {
            
            $table->string('naziv')->change();
        });
    }
}
