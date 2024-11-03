<?php

namespace App\Http\Resources;

use App\Http\Resources\Simple\EquipmentSimpleResource;
use App\Models\UnitOfMeasurement;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialResource extends JsonResource
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
            'title' => $this->title,
            'unit_of_measurement' => UnitOfMeasurementResource::make(UnitOfMeasurement::find($this->unit_of_measurement_id)),
            'price' => $this->price,
            'created_at' => $this->created_at?->toFormattedDateString(),
            'updated_at' => $this->updated_at?->toFormattedDateString(),
            'equipments' => EquipmentSimpleResource::collection($this->whenLoaded('equipments')),
        ];
    }
}
