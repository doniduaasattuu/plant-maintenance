<?php

namespace App\Http\Resources\Export;

use App\Models\Cleanliness;
use App\Models\Normality;
use App\Models\OperationalStatus;
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
            'operational_status_id' => OperationalStatus::find($this->operational_status_id)?->keyword,
            'cleanliness_id' => Cleanliness::find($this->cleanliness_id)?->keyword,
            'number_of_greasing' => $this->number_of_greasing,
            'temperature_de' => $this->temperature_de,
            'temperature_body' => $this->temperature_body,
            'temperature_nde' => $this->temperature_nde,
            'vibration_dev' => $this->vibration_dev,
            'vibration_deh' => $this->vibration_deh,
            'vibration_dea' => $this->vibration_dea,
            'vibration_def' => $this->vibration_def,
            'noise_de' => Normality::find($this->noise_de)?->keyword,
            'vibration_ndev' => $this->vibration_ndev,
            'vibration_ndeh' => $this->vibration_ndeh,
            'vibration_ndef' => $this->vibration_ndef,
            'noise_nde' => Normality::find($this->noise_nde)?->keyword,
            'checked_by' => "$user?->first_name $user?->last_name",
            'created_at' => $this->created_at?->toFormattedDateString(),
        ];
    }
}
