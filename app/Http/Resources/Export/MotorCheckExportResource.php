<?php

namespace App\Http\Resources\Export;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MotorCheckExportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::find($this->checked_by);

        return [
            'is_operational' => $this->is_operational ? "Running" : "Stopped",
            'is_clean' => $this->is_clean ? "Clean" : "Dirty",
            'number_of_greasing' => $this->number_of_greasing,
            'temperature_de' => $this->temperature_de,
            'temperature_body' => $this->temperature_body,
            'temperature_nde' => $this->temperature_nde,
            'vibration_dev' => $this->vibration_dev,
            'vibration_deh' => $this->vibration_deh,
            'vibration_dea' => $this->vibration_dea,
            'vibration_def' => $this->vibration_def,
            'is_noisy_de' => $this->is_noisy_de ? "Noise" : "Normal",
            'vibration_ndev' => $this->vibration_ndev,
            'vibration_ndeh' => $this->vibration_ndeh,
            'vibration_ndef' => $this->vibration_ndef,
            'is_noisy_nde' => $this->is_noisy_nde ? "Noise" : "Normal",
            'checked_by' => "$user?->first_name $user?->last_name",
            'created_at' => $this->created_at?->toFormattedDateString(),
        ];
    }
}
