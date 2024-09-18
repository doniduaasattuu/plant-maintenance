<?php

namespace App\Http\Requests;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMaterialRequest extends FormRequest
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
        $material = Material::find(class_basename($this->path()));

        $this->merge([
            'updated_at' => now(),
        ]);

        return [
            'id' => ['required', 'numeric', 'digits:8', Rule::unique(Material::class)->ignore($material->id)],
            'title' => ['required', 'max:255', 'string'],
            'unit_of_measurement_id' => ['nullable', 'exists:App\Models\UnitOfMeasurement,id'],
            'price' => ['nullable', 'numeric', "max:$max_price"],
            'updated_at' => ['nullable'],
        ];
    }
}
