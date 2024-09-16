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
            'operational_status_id' => $this->operational_status_id,
            'leakage' => $this->leakage,
            'evaporator' => $this->evaporator,
            'condensor' => $this->condensor,
            'current_before_cleaning' => $this->current_before_cleaning,
            'current_after_cleaning' => $this->current_after_cleaning,
            'temperature' => $this->temperature,
            'remote' => $this->remote,
            'compressor_pressure' => $this->compressor_pressure,
            'cleaning_filter_indoor' => $this->cleaning_filter_indoor,
            'cleaning_indoor' => $this->cleaning_indoor,
            'cleaning_outdoor' => $this->cleaning_outdoor,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'checked_by' => $this->checked_by,
        ];
    }
}
