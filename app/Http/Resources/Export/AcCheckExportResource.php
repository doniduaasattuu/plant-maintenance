<?php

namespace App\Http\Resources\Export;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcCheckExportResource extends JsonResource
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
            'is_drain_leaking' => $this->is_drain_leaking ? "No" : "Leak",
            'current_load' => $this->current_load,
            'blowing_temperature' => $this->blowing_temperature,
            'ambient_temperature' => $this->ambient_temperature,
            'is_filter_clean' => $this->is_filter_clean ? "Clean" : "Dirty",
            'is_evaporator_clean' => $this->is_evaporator_clean ? "Clean" : "Dirty",
            'is_condensor_clean' => $this->is_condensor_clean ? "Clean" : "Dirty",
            'cleaning_filter' => $this->cleaning_filter ? "Cleaning" : "No",
            'cleaning_evaporator' => $this->cleaning_evaporator ? "Cleaning" : "No",
            'cleaning_condensor' => $this->cleaning_condensor ? "Cleaning" : "No",
            'checked_by' => "$user?->first_name $user?->last_name",
            'created_at' => $this->created_at?->toFormattedDateString(),
        ];
    }
}
