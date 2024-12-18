<?php

namespace App\Http\Resources\Simple;

use App\Http\Resources\ClassificationResource;
use App\Models\Classification;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentSimpleResource extends JsonResource
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
            'sort_field' => $this->sort_field,
            'classification' => ClassificationResource::make(Classification::find($this->classification_id)),
        ];
    }
}
