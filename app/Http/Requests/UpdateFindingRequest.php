<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFindingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $upload_max_filesize = config('app.upload_max_filesize');

        $this->merge([
            'closed_by' => $this->finding_status_id == 2 ? auth()->user()->id : null,
            'updated_at' => now(),
        ]);

        return [
            'finding_status_id' => ['required', 'exists:App\Models\FindingStatus,id'],
            'equipment_id' => ['nullable', 'exists:App\Models\Equipment,id'],
            'functional_location_id' => ['nullable', 'exists:App\Models\FunctionalLocation,id'],
            'notification' => ['nullable', 'digits:8', 'numeric'],
            'description' => ['required'],
            'attachment_after' => ['nullable', 'image', 'prohibited_if:finding_status_id,1', "max:$upload_max_filesize"],
            'closed_by' => ['nullable', 'required_if:finding_status_id,2', 'prohibited_if:finding_status_id,1', 'exists:App\Models\User,id'],
            'updated_at' => ['nullable'],
        ];
    }
}
