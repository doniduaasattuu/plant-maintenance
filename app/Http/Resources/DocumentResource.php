<?php

namespace App\Http\Resources;

use App\Http\Resources\Simple\UserSimpleResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
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
            'attachment' => $this->attachment,
            'uploaded_by' => UserSimpleResource::make(User::find($this->uploaded_by)),
            'created_at' => $this->created_at?->toFormattedDateString(),
            'updated_at' => $this->updated_at?->toFormattedDateString(),
            'canUpdate' => auth()->user()->can('update', $this->resource),
            'canDelete' => auth()->user()->can('delete', $this->resource),
        ];
    }
}
