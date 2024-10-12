<?php

namespace App\Http\Resources;

use App\Http\Resources\Simple\UserSimpleResource;
use App\Models\Cleanliness;
use App\Models\Confirmation;
use App\Models\Goodness;
use App\Models\OperationalStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcCheckResource extends JsonResource
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
            'operational_status' => OperationalStatusResource::make(OperationalStatus::find($this->operational_status_id)),
            'leakage' => ConfirmationResource::make(Confirmation::find($this->leakage)),
            'evaporator' => CleanlinessResource::make(Cleanliness::find($this->evaporator)),
            'condensor' =>  CleanlinessResource::make(Cleanliness::find($this->condensor)),
            'current_before_cleaning' => $this->current_before_cleaning,
            'current_after_cleaning' => $this->current_after_cleaning,
            'temperature' => $this->temperature,
            'remote' => GoodnessResource::make(Goodness::find($this->remote)),
            'compressor_pressure' => $this->compressor_pressure,
            'cleaning_filter_indoor' => ConfirmationResource::make(Confirmation::find($this->cleaning_filter_indoor)),
            'cleaning_indoor' => ConfirmationResource::make(Confirmation::find($this->cleaning_indoor)),
            'cleaning_outdoor' => ConfirmationResource::make(Confirmation::find($this->cleaning_outdoor)),
            'created_at' => $this->created_at?->toFormattedDateString(),
            'updated_at' => $this->updated_at?->toFormattedDateString(),
            'checked_by' => UserSimpleResource::make(User::find($this->checked_by)),
        ];
    }
}
