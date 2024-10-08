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
            'seal' => GoodnessResource::make(Goodness::find($this->seal)),
            'weight' => GoodnessResource::make(Goodness::find($this->weight)),
            'pressure' => GoodnessResource::make(Goodness::find($this->pressure)),
            'body' => RustinessResource::make(Rustiness::find($this->body)),
            'remark' => $this->remark,
            'checked_by' => UserSimpleResource::make(User::find($this->checked_by)),
            'created_at' => $this->created_at->toFormattedDateString(),
            'updated_at' => $this->updated_at->toFormattedDateString(),
        ];
    }
}
