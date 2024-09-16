<?php

namespace Database\Factories;

use App\Models\Cleanliness;
use App\Models\Confirmation;
use App\Models\Goodness;
use App\Models\OperationalStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AirConditionerCheckRecord>
 */
class AirConditionerCheckRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'equipment_id' => DB::table('equipments')->where('classification_id', 'ZCLASS_U001')->get()->random()->id,
            'operational_status_id' => OperationalStatus::all()->random()->id,
            'leakage' => Confirmation::all()->random()->id,
            'evaporator' => Cleanliness::all()->random()->id,
            'condensor' => Cleanliness::all()->random()->id,
            'current_before_cleaning' => fake()->numberBetween(3, 16),
            'current_after_cleaning' => fake()->numberBetween(3, 16),
            'temperature' => fake()->numberBetween(16, 28),
            'remote' => Goodness::all()->random()->id,
            'compressor_pressure' => fake()->numberBetween(4, 10),
            'cleaning_filter_indoor' => Confirmation::all()->random()->id,
            'cleaning_indoor' => Confirmation::all()->random()->id,
            'cleaning_outdoor' => Confirmation::all()->random()->id,
            'created_at' => now(),
            'updated_at' => now(),
            'checked_by' => User::all()->random()->id,
        ];
    }
}
