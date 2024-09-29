<?php

namespace App\Http\Requests;

use App\Models\Document;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentRequest extends FormRequest
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
        $document = Document::find(class_basename($this->path()));
        $upload_max_filesize = config('app.upload_max_filesize');

        $this->merge([
            'uploaded_by' => auth()->user()->id,
            'updated_at' => now(),
        ]);

        return [
            'title' => ['required', 'max:100', Rule::unique(Document::class)->ignore($document->id)],
            'attachment' => ['nullable', 'mimes:pdf', "max:$upload_max_filesize"],
            'selectedEquipments' => ['nullable'],
            'uploaded_by' => ['nullable', 'exists:App\Models\User,id'],
            'updated_at' => ['nullable'],
        ];
    }
}
