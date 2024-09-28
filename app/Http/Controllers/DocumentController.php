<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Http\Resources\Simple\DocumentSimpleResource;
use App\Models\Document;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('document_access');

        $documents = Document::search($request)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Document/Index', [
            'documents' => DocumentResource::collection($documents),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('document_create');

        return Inertia::render('Document/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        Gate::authorize('document_create');
        $validated = $request->safe()->except(['attachment']);

        if ($request->hasFile('attachment')) {
            Storage::disk('public')->delete($request->attachment);

            $fileName = uniqid() .  '.' . strtolower($request->file('attachment')->extension());
            $path = $request->file('attachment')->storeAs('documents', $fileName, 'public');
            $validated['attachment'] = $path;
        }

        Document::create($validated);

        return redirect()
            ->route('documents.index')
            ->with('success', 'Document successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        Gate::authorize('document_show');

        $filePath = storage_path('app/public/' . $document->attachment);

        if (!file_exists($filePath)) {
            abort(404);
        }

        $title = $document->title . '.pdf';

        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "inline; filename=$title",
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        Gate::authorize('document_edit');

        return Inertia::render('Document/Edit', [
            'document' => DocumentSimpleResource::make($document),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        Gate::authorize('document_update');
        $validated = $request->safe()->except(['attachment']);

        if ($request->hasFile('attachment')) {
            Storage::disk('public')->delete($request->attachment);

            $uniqid = explode('/', explode('.', $document->attachment)[0])[1];

            $fileName = $uniqid .  '.' . strtolower($request->file('attachment')->extension());
            $path = $request->file('attachment')->storeAs('documents', $fileName, 'public');
            $validated['attachment'] = $path;
        }

        $document->update($validated);

        return redirect()
            ->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        Gate::authorize('document_delete');

        Storage::disk('public')->delete($document->attachment);

        $document->delete();

        return redirect()
            ->back()
            ->with('success', 'Document successfully deleted');
    }
}
