<?php

namespace Database\Seeders;

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
        $total = 150;
        $motorChecks = MotorCheck::factory()
            ->count($total)
            ->create();

        EquipmentCheckingForm::factory()->count($total)->sequence(fn($sequence) => [
            'equipment_id' => Equipment::where(['classification_id' => 'ZCLASS_E009', 'equipment_status_id' => 2])->get()->random()->id,
            'formable_id' => $motorChecks[$sequence->index]->id,
            'formable_type' => 'motor_check',
            'created_at' => now(),
            'updated_at' => now(),
        ])->create();
    }
}
