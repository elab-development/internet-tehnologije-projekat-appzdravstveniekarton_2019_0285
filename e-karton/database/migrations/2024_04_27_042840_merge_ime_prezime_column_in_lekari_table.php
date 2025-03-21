<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MergeImePrezimeColumnInLekariTable extends Migration
{
    public function up()
    {
        Schema::table('lekars', function (Blueprint $table) {
            $table->string('Ime_Prezime')->nullable();
        });

        // Spajamo ime i prezime u jednu kolonu
        DB::table('lekars')->update([
            'Ime_Prezime' => DB::raw("CONCAT(ime, ' ', prezime)")
        ]);

        Schema::table('lekars', function (Blueprint $table) {
            $table->dropColumn(['ime', 'prezime']);
        });
    }

    public function down()
    {
        Schema::table('lekars', function (Blueprint $table) {
            $table->string('ime');
            $table->string('prezime');
        });

        // Razdvajamo Ime_Prezime u dve kolone
        DB::table('lekars')->update([
            'ime' => DB::raw("SUBSTRING_INDEX(Ime_Prezime, ' ', 1)"),
            'prezime' => DB::raw("SUBSTRING_INDEX(Ime_Prezime, ' ', -1)")
        ]);

        Schema::table('lekars', function (Blueprint $table) {
            $table->dropColumn('Ime_Prezime');
        });
    }
}
