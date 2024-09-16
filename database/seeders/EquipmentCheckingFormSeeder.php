<?php

namespace Database\Seeders;

use App\Models\AcCheck;
use App\Models\Equipment;
use App\Models\EquipmentCheckingForm;
use App\Models\MotorCheck;
use Illuminate\Database\Seeder;

class EquipmentCheckingFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $total = 160;
        $tableCount = 2;
        $perTable = $total / $tableCount;

        $motorChecks = MotorCheck::factory()
            ->count($perTable)
            ->create();

        $acChecks = AcCheck::factory()
            ->count($perTable)
            ->create();

        EquipmentCheckingForm::factory()->count($perTable)->sequence(fn($sequence) => [
            'equipment_id' => Equipment::where(['classification_id' => 'ZCLASS_E009', 'equipment_status_id' => 2])->get()->random()->id,
            'formable_id' => $motorChecks[$sequence->index]->id,
            'formable_type' => 'motor_check',
            'created_at' => now(),
            'updated_at' => now(),
        ])->create();

        EquipmentCheckingForm::factory()->count($perTable)->sequence(fn($sequence) => [
            'equipment_id' => Equipment::where(['classification_id' => 'ZCLASS_U001', 'equipment_status_id' => 2])->get()->random()->id,
            'formable_id' => $acChecks[$sequence->index]->id,
            'formable_type' => 'ac_check',
            'created_at' => now(),
            'updated_at' => now(),
        ])->create();
    }
}
