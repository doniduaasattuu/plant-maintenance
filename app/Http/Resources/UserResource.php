<?php

namespace App\Http\Resources;

use App\Models\Department;
use App\Models\Position;
use App\Models\WorkCenter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => "$this->first_name $this->last_name",
            'department' => DepartmentResource::make(Department::find($this->department_id)),
            'position' => PositionResource::make(Position::find($this->position_id)),
            'isOnline' => $this->isOnline(),
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'work_center' => WorkCenterResource::make(WorkCenter::find($this->work_center_id)),
            'roles' => $this->roles,
            'created_at' => $this->created_at->toFormattedDateString(),
            'updated_at' => $this->updated_at->toFormattedDateString(),
        ];
    }
}
