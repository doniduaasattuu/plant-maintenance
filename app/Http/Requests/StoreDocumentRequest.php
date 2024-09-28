<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
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
        $upload_max_filesize = config('app.upload_max_filesize');

        $this->merge([
            'uploaded_by' => auth()->user()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [
            'title' => ['required', 'max:100', 'unique:App\Models\Document,title'],
            'attachment' => ['required', 'mimes:pdf', "max:$upload_max_filesize"],
            'uploaded_by' => ['nullable', 'exists:App\Models\User,id'],
            'created_at' => ['nullable'],
            'updated_at' => ['nullable'],
        ];
    }
}
