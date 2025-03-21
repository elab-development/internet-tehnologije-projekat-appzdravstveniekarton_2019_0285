<?php

namespace Database\Factories;


use App\Models\Dijagnoza;
use App\Models\User;
use App\Models\Lekar;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dijagnoza>
 */
class DijagnozaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'lekar_id' => Lekar::inRandomOrder()->first()->id,
            'naziv' => $this->faker->word,
            'opis' => $this->faker->sentence,
        ];
    }
}
