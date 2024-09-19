<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFunctionalLocationRequest extends FormRequest
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
            'updated_by' => auth()->user()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [
            'id' => ['required', 'min:9', 'max:24', 'string', 'uppercase', 'unique:App\Models\FunctionalLocation,id'],
            'description' => ['required', 'max:100', 'string'],
            'updated_by' => ['nullable', 'exists:App\Models\User,id'],
            'created_at' => ['nullable'],
            'updated_at' => ['nullable'],
        ];
    }
}
