<?php

namespace App\Http\Services;

use App\Models\Equipment;
use App\Models\EquipmentMovement;
use App\Models\FunctionalLocation;

class EquipmentMovementService
{
    public function logEquipmentMovement(array $validated): void
    {
        $equipment = Equipment::find($validated['id']);

        if (!$equipment) {
            // EQUIPMENT IS CREATED

            if ($validated['equipment_status_id'] == 2 && $validated['functional_location_id'] != null) {

                $installed = [
                    'functional_location_id' => $validated['functional_location_id'],
                    'functional_location_description' => FunctionalLocation::find($validated['functional_location_id'])->description,
                    'equipment_id' => $validated['id'],
                    'equipment_sort_field' => $validated['sort_field'],
                    'movement_status_id' => 1,
                    'replaced_by' => auth()->user()->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                EquipmentMovement::insert($installed);
            }
        } else {

            // EQUIPMENT IS UPDATED
            if ($validated['equipment_status_id'] == 2 && $validated['functional_location_id'] != null) {

                if (!is_null($equipment->functional_location_id) && $equipment->functional_location_id != $validated['functional_location_id']) {
                    // INSTALL FUNCTIONAL LOCATION

                    $functionalLocationDescription = FunctionalLocation::find($equipment->functional_location_id)->description;

                    // DISMANTLED
                    $dismantled = new EquipmentMovement([
                        'functional_location_id' => $equipment->functional_location_id,
                        'functional_location_description' => $functionalLocationDescription,
                        'equipment_id' => $validated['id'],
                        'equipment_sort_field' => $equipment->sort_field,
                        'movement_status_id' => 2,
                        'replaced_by' => auth()->user()->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    // INSTALLED
                    $installed = new EquipmentMovement([
                        'functional_location_id' => $validated['functional_location_id'],
                        'functional_location_description' => FunctionalLocation::find($validated['functional_location_id'])?->description,
                        'equipment_id' => $validated['id'],
                        'equipment_sort_field' => $validated['sort_field'],
                        'movement_status_id' => 1,
                        'replaced_by' => auth()->user()->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    if ($dismantled->save()) {
                        $installed->save();
                    }
                } else  if (is_null($equipment->functional_location_id) && $equipment->functional_location_id != $validated['functional_location_id']) {

                    // INSTALLED
                    EquipmentMovement::insert([
                        'functional_location_id' => $validated['functional_location_id'],
                        'functional_location_description' => FunctionalLocation::find($validated['functional_location_id'])->description,
                        'equipment_id' => $validated['id'],
                        'equipment_sort_field' => $validated['sort_field'],
                        'movement_status_id' => 1,
                        'replaced_by' => auth()->user()->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            } else if ($validated['equipment_status_id'] != 2 && $validated['functional_location_id'] == null) {

                if ($equipment->functional_location_id != null) {
                    // DISMANTLED FROM FUNCTION LOCATION
                    EquipmentMovement::insert([
                        'functional_location_id' => $equipment->functional_location_id,
                        'functional_location_description' => FunctionalLocation::find($equipment->functional_location_id)->description,
                        'equipment_id' => $validated['id'],
                        'equipment_sort_field' => $equipment->sort_field,
                        'movement_status_id' => 2,
                        'replaced_by' => auth()->user()->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
