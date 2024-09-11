<?php

namespace Database\Seeders;

use App\Models\Cleanliness;
use App\Models\MotorCheckRecord;
use App\Models\Normality;
use App\Models\OperationalStatus;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MotorCheckRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MotorCheckRecord::factory()
            ->count(14)
            ->create();

        for ($i = 0; $i < 100; $i++) {
            MotorCheckRecord::insert([
                'equipment_id' => 'EMO000123',
                'operational_status_id' => OperationalStatus::all()->random()->id,
                'cleanliness_id' => Cleanliness::all()->random()->id,
                'number_of_greasing' => fake()->numberBetween(30, 150),
                'temperature_de' => fake()->randomFloat(2, 30, 100),
                'temperature_body' => fake()->randomFloat(2, 30, 100),
                'temperature_nde' => fake()->randomFloat(2, 30, 100),
                'vibration_dev' => fake()->randomFloat(2, 0, 5),
                'vibration_deh' => fake()->randomFloat(2, 0, 5),
                'vibration_dea' => fake()->randomFloat(2, 0, 5),
                'vibration_def' => fake()->randomFloat(2, 0, 5),
                'noise_de' => Normality::all()->random()->id,
                'vibration_ndev' => fake()->randomFloat(2, 0, 5),
                'vibration_ndeh' => fake()->randomFloat(2, 0, 5),
                'vibration_ndef' => fake()->randomFloat(2, 0, 5),
                'noise_nde' => Normality::all()->random()->id,
                'created_at' => now()->addDays(- ($i + 1)),
                'updated_at' => now()->addDays(- ($i + 1)),
                'checked_by' => User::all()->random()->id,
            ]);
        }
    }
}
