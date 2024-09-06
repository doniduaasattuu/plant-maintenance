<?php

namespace Database\Seeders;

use App\Models\EquipmentStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipmentStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipment_status = [
            [
                'id' => 1,
                'keyword' => 'Available'
            ],
            [
                'id' => 2,
                'keyword' => 'Installed'
            ],
            [
                'id' => 3,
                'keyword' => 'Repaired'
            ],
        ];

        EquipmentStatus::insert($equipment_status);
    }
}
