<?php

namespace App\Http\Resources\Export;

use App\Models\Cleanliness;
use App\Models\Confirmation;
use App\Models\Goodness;
use App\Models\OperationalStatus;
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
            'operational_status_id' => OperationalStatus::find($this->operational_status_id)?->keyword,
            'leakage' => Confirmation::find($this->leakage)?->keyword,
            'evaporator' => Cleanliness::find($this->evaporator)?->keyword,
            'condensor' => Cleanliness::find($this->condensor)?->keyword,
            'current_before_cleaning' => $this->current_before_cleaning,
            'current_after_cleaning' => $this->current_after_cleaning,
            'temperature' => $this->temperature,
            'remote' => Goodness::find($this->remote)?->keyword,
            'compressor_pressure' => $this->compressor_pressure,
            'cleaning_filter_indoor' => Confirmation::find($this->cleaning_filter_indoor)?->keyword,
            'cleaning_indoor' => Confirmation::find($this->cleaning_indoor)?->keyword,
            'cleaning_outdoor' => Confirmation::find($this->cleaning_outdoor)?->keyword,
            'checked_by' => "$user?->first_name $user?->last_name",
            'created_at' => $this->created_at?->toFormattedDateString(),
        ];
    }
}
