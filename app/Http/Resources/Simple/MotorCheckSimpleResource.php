<?php

namespace App\Http\Resources\Simple;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MotorCheckSimpleResource extends JsonResource
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
            'cleanliness_id' => $this->cleanliness_id,
            'number_of_greasing' => $this->number_of_greasing,
            'temperature_de' => $this->temperature_de,
            'temperature_body' => $this->temperature_body,
            'temperature_nde' => $this->temperature_nde,
            'vibration_dev' => $this->vibration_dev,
            'vibration_deh' => $this->vibration_deh,
            'vibration_dea' => $this->vibration_dea,
            'vibration_def' => $this->vibration_def,
            'noise_de' => $this->noise_de,
            'vibration_ndev' => $this->vibration_ndev,
            'vibration_ndeh' => $this->vibration_ndeh,
            'vibration_ndef' => $this->vibration_ndef,
            'noise_nde' => $this->noise_nde,
            'created_at' => $this->created_at?->toFormattedDateString(),
            'updated_at' => $this->updated_at?->toFormattedDateString(),
            'checked_by' => $this->checked_by,
        ];
    }
}
