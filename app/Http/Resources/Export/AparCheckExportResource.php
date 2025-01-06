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
            'is_seal_ok' => $this->is_seal_ok ? 'Good' : 'Not Good',
            'is_weight_ok' => $this->is_weight_ok ? 'Good' : 'Not Good',
            'is_pressure_ok' => $this->is_pressure_ok ? 'Good' : 'Not Good',
            'is_body_ok' => $this->is_body_ok ? 'Good' : 'Not Good',
            'remark' => $this->remark,
            'checked_by' => "$user?->first_name $user?->last_name",
            'created_at' => $this->created_at?->toFormattedDateString(),
        ];
    }
}
