<?php

namespace Database\Seeders;

use App\Models\Equipment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equipment::factory()
            ->count(200)
            ->create();

        Equipment::insert([
            'id' => 'EMO000123',
            'classification_id' => 'ZCLASS_E009',
            'functional_location_id' => 'FP-01-PM3',
            'sort_field' => 'MOTOR SUMPIT SP3',
            'description' => '55kW;105A;4P;1500RPM;INVERTER',
            'equipment_status_id' => 2,
            'updated_by' => '55000154',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
