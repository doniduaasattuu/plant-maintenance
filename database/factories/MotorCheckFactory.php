<?php

namespace Database\Factories;

use App\Models\Cleanliness;
use App\Models\Normality;
use App\Models\OperationalStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'operational_status_id' => OperationalStatus::all()->random()->id,
            'cleanliness_id' => Cleanliness::all()->random()->id,
            'number_of_greasing' => fake()->numberBetween(30, 150),
            'temperature_de' => fake()->randomFloat(2, 30, 100),
            'temperature_body' => fake()->randomFloat(2, 30, 100),
            'temperature_nde' => fake()->randomFloat(2, 30, 100),
            'vibration_dev' => fake()->randomFloat(2, 0, 45),
            'vibration_deh' => fake()->randomFloat(2, 0, 45),
            'vibration_dea' => fake()->randomFloat(2, 0, 45),
            'vibration_def' => fake()->randomFloat(2, 0, 45),
            'noise_de' => Normality::all()->random()->id,
            'vibration_ndev' => fake()->randomFloat(2, 0, 45),
            'vibration_ndeh' => fake()->randomFloat(2, 0, 45),
            'vibration_ndef' => fake()->randomFloat(2, 0, 45),
            'noise_nde' => Normality::all()->random()->id,
            'checked_by' => User::all()->random()->id,
        ];
    }
}
