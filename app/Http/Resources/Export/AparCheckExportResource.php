<?php

namespace App\Http\Resources\Export;

use App\Models\Goodness;
use App\Models\Rustiness;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AparCheckExportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::find($this->checked_by);

        return [
            'seal' => Goodness::find($this->seal)?->keyword,
            'weight' => Goodness::find($this->weight)?->keyword,
            'pressure' => Goodness::find($this->pressure)?->keyword,
            'body' => Rustiness::find($this->body)?->keyword,
            'remark' => $this->remark,
            'checked_by' => "$user?->first_name $user?->last_name",
            'created_at' => $this->created_at?->toFormattedDateString(),
        ];
    }
}
