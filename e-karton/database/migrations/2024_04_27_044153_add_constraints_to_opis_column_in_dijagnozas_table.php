<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddConstraintsToOpisColumnInDijagnozasTable extends Migration
{
    public function up()
    {
        Schema::table('dijagnozas', function (Blueprint $table) {
            $table->string('opis', 200)->change(); // Dodajemo ograničenje dužine na 255 karaktera
        });
    }

    public function down()
    {
        Schema::table('dijagnozas', function (Blueprint $table) {
            // Ako želimo da uklonimo ograničenje dužine, možemo koristiti change() metodu bez ograničenja dužine
            $table->string('opis')->change();
        });
    }
}
