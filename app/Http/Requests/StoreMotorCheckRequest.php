<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMotorCheckRequest extends FormRequest
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
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [
            'equipment_id' => ['required', 'exists:App\Models\Equipment,id'],
            'is_operational' => ['required', 'boolean'],
            'is_clean' => ['required', 'boolean'],
            'number_of_greasing' => ['nullable', 'numeric'],
            'temperature_de' => ['required', 'numeric', 'max:150'],
            'temperature_body' => ['required', 'numeric', 'max:150'],
            'temperature_nde' => ['required', 'numeric', 'max:150'],
            'vibration_dev' => ['nullable', 'numeric', 'max:45'],
            'vibration_deh' => ['nullable', 'numeric', 'max:45'],
            'vibration_dea' => ['nullable', 'numeric', 'max:45'],
            'vibration_def' => ['nullable', 'numeric', 'max:45'],
            'is_noisy_de' => ['required', 'boolean'],
            'vibration_ndev' => ['nullable', 'numeric', 'max:45'],
            'vibration_ndeh' => ['nullable', 'numeric', 'max:45'],
            'vibration_ndef' => ['nullable', 'numeric', 'max:45'],
            'is_noisy_nde' => ['required', 'boolean'],
            'checked_by' => ['nullable', 'exists:App\Models\User,id'],
            'created_at' => ['nullable'],
            'updated_at' => ['nullable'],
        ];
    }
}
