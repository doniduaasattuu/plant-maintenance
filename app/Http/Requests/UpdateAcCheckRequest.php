<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAcCheckRequest extends FormRequest
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
        $this->merge([
            'checked_by' => auth()->user()->id,
            'updated_at' => now(),
        ]);

        return [
            'equipment_id' => ['required', 'exists:App\Models\Equipment,id'],
            'operational_status_id' => ['required', 'exists:App\Models\OperationalStatus,id'],
            'leakage' => ['required', 'exists:App\Models\Confirmation,id'],
            'evaporator' => ['required', 'exists:App\Models\Confirmation,id'],
            'condensor' => ['required', 'exists:App\Models\Confirmation,id'],
            'current_before_cleaning' => ['nullable', 'numeric', 'max:100'],
            'current_after_cleaning' => ['nullable', 'numeric', 'max:100'],
            'temperature' => ['nullable', 'numeric'],
            'remote' => ['required', 'exists:App\Models\Goodness,id'],
            'compressor_pressure' => ['nullable', 'numeric'],
            'cleaning_filter_indoor' => ['required', 'exists:App\Models\Confirmation,id'],
            'cleaning_indoor' => ['required', 'exists:App\Models\Confirmation,id'],
            'cleaning_outdoor' => ['required', 'exists:App\Models\Confirmation,id'],
            'checked_by' => ['nullable', 'exists:App\Models\User,id'],
            'updated_at' => ['nullable'],
        ];
    }
}
