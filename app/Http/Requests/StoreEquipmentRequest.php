<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEquipmentRequest extends FormRequest
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
        $funclocExist = $this->functional_location_id != null;
        $funclocNotExist = $this->functional_location_id == null;

        $statusInstalled = $this->equipment_status_id == 2;
        $statusNotInstalled = $this->equipment_status_id != 2;

        $this->merge([
            'updated_by' => auth()->user()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [
            'id' => ['required', 'size:9', 'uppercase', 'unique:App\Models\Equipment,id'],
            'classification_id' => ['required', 'exists:App\Models\Classification,id'],
            'equipment_status_id' => ['required', 'exists:App\Models\EquipmentStatus,id'],
            'functional_location_id' => ['nullable', Rule::prohibitedIf(fn() => $statusNotInstalled), Rule::requiredIf(fn() => $statusInstalled), 'exists:App\Models\FunctionalLocation,id'],
            'sort_field' => [Rule::requiredIf($funclocExist), Rule::prohibitedIf($funclocNotExist), 'nullable', 'max:50'],
            'description' => [Rule::requiredIf($funclocExist), 'nullable', 'min:5', 'max:100'],
            'updated_by' => ['nullable', 'exists:App\Models\User,id'],
            'created_at' => ['nullable'],
            'updated_at' => ['nullable'],
        ];
    }
}
