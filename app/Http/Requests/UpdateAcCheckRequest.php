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
            'is_operational' => ['required', 'boolean'],
            'is_drain_leaking' => ['required', 'boolean'],
            'current_load' => ['nullable', 'numeric'],
            'blowing_temperature' => ['nullable', 'numeric', 'max:45'],
            'ambient_temperature' => ['nullable', 'numeric', 'max:45'],
            'is_filter_clean' => ['required', 'boolean'],
            'is_evaporator_clean' => ['required', 'boolean'],
            'is_condensor_clean' => ['required', 'boolean'],
            'cleaning_filter' => ['required', 'boolean'],
            'cleaning_evaporator' => ['required', 'boolean'],
            'cleaning_condensor' => ['required', 'boolean'],
            'checked_by' => ['nullable', 'exists:App\Models\User,id'],
            'checked_by' => ['nullable', 'exists:App\Models\User,id'],
            'updated_at' => ['nullable'],
        ];
    }
}
