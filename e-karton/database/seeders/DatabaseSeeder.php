<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Lekar;
use App\Models\Dijagnoza;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        User::factory(20)->create();
        Lekar::factory(10)->create()->each(function ($lekar) {
            Dijagnoza::factory(10)->create(['lekar_id' => $lekar->id]);
        });
    }
}