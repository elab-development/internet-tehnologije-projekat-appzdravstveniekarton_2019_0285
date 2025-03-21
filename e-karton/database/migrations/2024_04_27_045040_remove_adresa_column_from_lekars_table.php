<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveAdresaColumnFromLekarsTable extends Migration
{
    public function up()
    {
        Schema::table('lekars', function (Blueprint $table) {
           
            $table->dropColumn('adresa');
        });
    }

    public function down()
    {
        Schema::table('lekars', function (Blueprint $table) {
            
            $table->string('adresa');
        });
    }
}

