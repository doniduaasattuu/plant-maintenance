<?php

namespace App\Http\Requests;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
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
        $max_price = Material::MAX_PRICE;

        $this->merge([
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [
            'id' => ['required', 'numeric', 'digits:8', 'unique:App\Models\Material,id'],
            'title' => ['required', 'max:100', 'string'],
            'unit_of_measurement_id' => ['nullable', 'exists:App\Models\UnitOfMeasurement,id'],
            'price' => ['nullable', 'numeric', "max:$max_price"],
            'created_at' => ['nullable'],
            'updated_at' => ['nullable'],
        ];
    }
}
