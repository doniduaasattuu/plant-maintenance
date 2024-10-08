<?php

namespace Database\Seeders;

use App\Models\Classification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classifications = [
            [
                'id' => 'ZCLASS_E008',
                'description' => 'ELECTRICAL PANEL',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_E009',
                'description' => 'MOTOR /DRIVE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_E012',
                'description' => 'TRANSFORMER',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_U001',
                'description' => 'AIR CONDITIONER /CHILLER',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_M001',
                'description' => 'AGITATOR',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_I013',
                'description' => 'FLOW TRANSMITTER',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_I047',
                'description' => 'ON /OFF VALVE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_I026',
                'description' => 'PRESSURE TRANSMITTER',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_M038',
                'description' => 'SCREENER',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_P001',
                'description' => 'SCREEN BASKET',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ZCLASS_S001',
                'description' => 'FIRE EXTINGUISHER',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Classification::insert($classifications);
    }
}
