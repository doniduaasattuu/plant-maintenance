<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        $user = User::find(class_basename($this->path()));

        return [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:50', Rule::unique(User::class)->ignore($user->id)],
            'phone_number' => ['nullable', 'numeric', 'regex:/^[0-9]+$/i', 'max_digits:15', Rule::unique(User::class)->ignore($user->id)],
            'department_id' => ['nullable', 'exists:App\Models\Department,id'],
            'position_id' => ['nullable', 'exists:App\Models\Position,id'],
            'work_center_id' => ['nullable', 'exists:App\Models\WorkCenter,id'],
        ];
    }
}
