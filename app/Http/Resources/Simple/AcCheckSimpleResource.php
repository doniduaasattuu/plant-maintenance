<?php

namespace App\Http\Resources\Simple;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcCheckSimpleResource extends JsonResource
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
            'equipment_id' => $this->checkingForm->equipment_id,
            'is_operational' => $this->is_operational,
            'is_drain_leaking' => $this->is_drain_leaking,
            'current_load' => $this->current_load,
            'blowing_temperature' => $this->blowing_temperature,
            'ambient_temperature' => $this->ambient_temperature,
            'is_filter_clean' => $this->is_filter_clean,
            'is_evaporator_clean' => $this->is_evaporator_clean,
            'is_condensor_clean' => $this->is_condensor_clean,
            'cleaning_filter' => $this->cleaning_filter,
            'cleaning_evaporator' => $this->cleaning_evaporator,
            'cleaning_condensor' => $this->cleaning_condensor,
            'checked_by' => $this->checked_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
