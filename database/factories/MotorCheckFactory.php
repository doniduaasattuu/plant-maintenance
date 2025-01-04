<?php

namespace Database\Factories;

use App\Models\Cleanliness;
use App\Models\Normality;
use App\Models\OperationalStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MotorCheck>
 */
class MotorCheckFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'is_operational' => fake()->numberBetween(0, 1),
            'is_clean' => fake()->numberBetween(0, 1),
            'number_of_greasing' => fake()->numberBetween(30, 150),
            'temperature_de' => fake()->randomFloat(2, 30, 100),
            'temperature_body' => fake()->randomFloat(2, 30, 100),
            'temperature_nde' => fake()->randomFloat(2, 30, 100),
            'vibration_dev' => fake()->randomFloat(2, 0, 45),
            'vibration_deh' => fake()->randomFloat(2, 0, 45),
            'vibration_dea' => fake()->randomFloat(2, 0, 45),
            'vibration_def' => fake()->randomFloat(2, 0, 45),
            'is_noisy_de' => fake()->numberBetween(0, 1),
            'vibration_ndev' => fake()->randomFloat(2, 0, 45),
            'vibration_ndeh' => fake()->randomFloat(2, 0, 45),
            'vibration_ndef' => fake()->randomFloat(2, 0, 45),
            'is_noisy_nde' => fake()->numberBetween(0, 1),
            'checked_by' => User::all()->random()->id,
        ];
    }
}
