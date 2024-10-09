<?php

namespace App\Http\Resources\Simple;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AparCheckSimpleResource extends JsonResource
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
            'seal' => $this->seal,
            'weight' => $this->weight,
            'pressure' => $this->pressure,
            'body' => $this->body,
            'remark' => $this->remark,
            'checked_by' => $this->checked_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
