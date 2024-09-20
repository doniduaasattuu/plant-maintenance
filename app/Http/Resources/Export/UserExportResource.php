<?php

namespace App\Http\Resources\Export;

use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserExportResource extends JsonResource
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
            'name' => "$this->first_name $this->last_name",
            'department' => Department::find($this->department_id)?->title,
            'position' => Position::find($this->position_id)?->title,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
        ];
    }
}
