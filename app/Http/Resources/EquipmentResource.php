<?php

namespace App\Http\Resources;

use App\Http\Resources\Simple\UserSimpleResource;
use App\Models\Classification;
use App\Models\EquipmentStatus;
use App\Models\FunctionalLocation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentResource extends JsonResource
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
            'classification' => ClassificationResource::make(Classification::find($this->classification_id)),
            'functional_location' => FunctionalLocationResource::make(FunctionalLocation::find($this->functional_location_id)),
            'sort_field' => $this->sort_field,
            'description' => $this->description,
            'status' => EquipmentStatusResource::make(EquipmentStatus::find($this->equipment_status_id)),
            'updated_by' => UserSimpleResource::make(User::find($this->updated_by)),
            'created_at' => $this->created_at->toFormattedDateString(),
            'updated_at' => $this->updated_at->toFormattedDateString(),
            'materials' => MaterialResource::collection($this->whenLoaded('materials')),
            'documents' => DocumentResource::collection($this->whenLoaded('documents')),
            'findings' => FindingResource::collection($this->whenLoaded('findings')),
        ];
    }
}
