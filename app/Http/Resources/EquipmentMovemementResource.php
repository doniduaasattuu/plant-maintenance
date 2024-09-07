<?php

namespace App\Http\Resources;

use App\Http\Resources\Simple\EquipmentSimpleResource;
use App\Http\Resources\Simple\FunctionalLocationSimpleResource;
use App\Http\Resources\Simple\UserSimpleResource;
use App\Models\Equipment;
use App\Models\EquipmentStatus;
use App\Models\FunctionalLocation;
use App\Models\MovementStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentMovemementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'functional_location' => FunctionalLocationSimpleResource::make(FunctionalLocation::find($this->functional_location_id)),
            'functional_location_description' => $this->functional_location_description,
            'equipment' => EquipmentSimpleResource::make(Equipment::find($this->equipment_id)),
            'equipment_sort_field' => $this->equipment_sort_field,
            'movement_status' => MovementStatusResource::make(MovementStatus::find($this->movement_status_id)),
            'replaced_by' => UserSimpleResource::make(User::find($this->replaced_by)),
            'created_at' => $this->created_at->toFormattedDateString(),
            'updated_at' => $this->updated_at->toFormattedDateString(),
        ];
    }
}
