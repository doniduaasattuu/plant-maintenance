<?php

namespace App\Http\Resources\Simple;

use App\Http\Resources\FindingStatusResource;
use App\Http\Resources\Simple\UserSimpleResource;
use App\Models\FindingStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FindingSimpleResource extends JsonResource
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
            'finding_status' => FindingStatusResource::make(FindingStatus::find($this->finding_status_id)),
            'equipment_id' => $this->equipment_id,
            'functional_location_id' => $this->functional_location_id,
            'description' => $this->description,
            'notification' => $this->notification,
            'attachment_before' => $this->attachment_before,
            'attachment_after' => $this->attachment_after,
            'reported_by' => UserSimpleResource::make(User::find($this->reported_by)),
            'closed_by' =>  UserSimpleResource::make(User::find($this->closed_by)),
            'created_at' => $this->created_at?->toFormattedDateString(),
            'updated_at' => $this->updated_at?->toFormattedDateString(),
            'canUpdate' => auth()->user()->can('update', $this->resource),
            'canDelete' => auth()->user()->can('delete', $this->resource),
        ];
    }
}
