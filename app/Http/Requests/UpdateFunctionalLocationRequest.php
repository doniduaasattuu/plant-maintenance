<?php

namespace App\Http\Requests;

use App\Models\FunctionalLocation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFunctionalLocationRequest extends FormRequest
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
        $functional_location = FunctionalLocation::find(class_basename($this->path()));

        $this->merge([
            'updated_by' => auth()->user()->id,
            'updated_at' => now(),
        ]);

        return [
            'id' => ['required', 'min:9', 'max:24', 'string', Rule::unique(FunctionalLocation::class)->ignore($functional_location->id)],
            'description' => ['required', 'max:100', 'string'],
            'updated_by' => ['nullable', 'exists:App\Models\User,id'],
            'updated_at' => ['nullable'],
        ];
    }
}
