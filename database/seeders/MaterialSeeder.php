<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Material::factory()
            ->count(100)
            ->create();

        Material::insert([
            'id' => '10010123',
            'title' => 'MAGNETIC CONTACTOR LC1D24 SCHNEIDER',
            'unit_of_measurement_id' => 'PC',
            'price' => 320000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
