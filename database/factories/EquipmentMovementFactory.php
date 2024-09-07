<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\EquipmentStatus;
use App\Models\FunctionalLocation;
use App\Models\MovementStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EquipmentMovement>
 */
class EquipmentMovementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $functionalLocation = FunctionalLocation::all()->random();
        $equipment = Equipment::all()->random();

        return [
            'functional_location_id' => $functionalLocation->id,
            'functional_location_description' => $functionalLocation->description,
            'equipment_id' => $equipment->id,
            'equipment_sort_field' => $equipment->sort_field,
            'movement_status_id' => MovementStatus::pluck('id')->random(),
            'replaced_by' => User::pluck('id')->random(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
