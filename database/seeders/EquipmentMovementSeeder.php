<?php

namespace Database\Seeders;

use App\Models\EquipmentMovement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipmentMovementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EquipmentMovement::factory()
            ->count(100)
            ->create();
    }
}
