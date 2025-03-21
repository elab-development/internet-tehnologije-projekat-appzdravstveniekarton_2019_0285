<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTerapijaColumnToDijagnozasTable extends Migration
{
    public function up()
    {
        Schema::table('dijagnozas', function (Blueprint $table) {
            $table->text('Terapija')->nullable();
        });
    }

    public function down()
    {
        Schema::table('dijagnozas', function (Blueprint $table) {
            $table->dropColumn('Terapija');
        });
    }
}

