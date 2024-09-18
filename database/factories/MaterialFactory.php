<?php

namespace Database\Factories;

use App\Models\UnitOfMeasurement;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Material>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => '1001' . fake()->unique()->numerify('####'),
            'title' => Str::upper(fake()->sentence()),
            'unit_of_measurement_id' => UnitOfMeasurement::all()->random()->id,
            'price' => fake()->numberBetween(0, 46000000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
