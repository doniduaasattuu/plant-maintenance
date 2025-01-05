<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAparCheckRequest extends FormRequest
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
            'is_seal_ok' => ['required', 'boolean'],
            'is_weight_ok' => ['required', 'boolean'],
            'is_pressure_ok' => ['required', 'boolean'],
            'is_body_ok' => ['required', 'boolean'],
            'remark' => ['nullable', 'string', 'max:255'],
            'checked_by' => ['nullable', 'exists:App\Models\User,id'],
            'updated_at' => ['nullable'],
        ];
    }
}
