<?php

namespace App\Http\Resources\Simple;

use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentSimpleResource extends JsonResource
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
            'equipments' => EquipmentSimpleResource::collection($this->whenLoaded('equipments')),
            'canUpdate' => auth()->user()->can('update', $this->resource),
            'canDelete' => auth()->user()->can('delete', $this->resource),
        ];
    }
}
