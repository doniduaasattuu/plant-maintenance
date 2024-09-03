<?php

namespace App\Http\Resources;

use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
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
            'division' => DivisionResource::make(Division::find($this->division_id)),
            'title' => $this->title,
        ];
    }
}
