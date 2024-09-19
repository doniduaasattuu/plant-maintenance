<?php

namespace App\Services;

use App\Models\Equipment;
use App\Models\EquipmentMovement;
use App\Models\FunctionalLocation;

class EquipmentMovementService
{
    public function install(array $validated): void
    {
        if ($validated['equipment_status_id'] == 2) {

            $installed = [
                'functional_location_id' => $validated['functional_location_id'],
                'functional_location_description' => FunctionalLocation::find($validated['functional_location_id'])->description,
                'equipment_id' => $validated['id'],
                'equipment_sort_field' => $validated['sort_field'],
                'movement_status_id' => 1,
                'replaced_by' => auth()->user()->id,
                'created_at' => now()->addSecond(),
                'updated_at' => now()->addSecond(),
            ];

            EquipmentMovement::insert($installed);
        }
    }

    public function dismantle(Equipment $equipment): void
    {

        $dismantled = [
            'functional_location_id' => $equipment->getOriginal('functional_location_id'),
            'functional_location_description' => FunctionalLocation::find($equipment->getOriginal('functional_location_id'))->description,
            'equipment_id' => $equipment->getOriginal('id'),
            'equipment_sort_field' => $equipment->getOriginal('sort_field'),
            'movement_status_id' => 2,
            'replaced_by' => auth()->user()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        EquipmentMovement::insert($dismantled);
    }
}
