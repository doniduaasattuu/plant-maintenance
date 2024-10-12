<?php

namespace App\Http\Resources;

use App\Http\Resources\Simple\EquipmentSimpleResource;
use App\Http\Resources\Simple\UserSimpleResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FunctionalLocationResource extends JsonResource
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
            'description' => $this->description,
            'updated_by' => UserSimpleResource::make(User::find($this->updated_by)),
            'created_at' => $this->created_at?->toFormattedDateString(),
            'updated_at' => $this->updated_at?->toFormattedDateString(),
            'equipments' => EquipmentSimpleResource::collection($this->equipments),
        ];
    }
}
