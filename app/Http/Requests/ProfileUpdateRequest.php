<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['nullable', 'string', 'max:50'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:50', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone_number' => ['nullable', 'numeric', 'regex:/^[0-9]+$/i', 'max_digits:15', Rule::unique(User::class)->ignore($this->user()->id)],
            'department_id' => ['nullable', 'exists:App\Models\Department,id'],
            'profile_photo' => ['nullable', 'image', 'max:2048']
        ];
    }
}
