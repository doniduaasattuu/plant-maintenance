<?php

namespace App\Http\Resources;

use App\Http\Resources\Simple\UserSimpleResource;
use App\Models\Goodness;
use App\Models\Rustiness;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AparCheckResource extends JsonResource
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
            'is_seal_ok' => $this->is_seal_ok,
            'is_weight_ok' => $this->is_weight_ok,
            'is_pressure_ok' => $this->is_pressure_ok,
            'is_body_ok' => $this->is_body_ok,
            'remark' => $this->remark,
            'checked_by' => UserSimpleResource::make(User::find($this->checked_by)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
