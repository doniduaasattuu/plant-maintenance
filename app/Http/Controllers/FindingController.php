<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFindingRequest;
use App\Http\Resources\FindingStatusResource;
use App\Http\Resources\Simple\FindingSimpleResource;
use App\Models\Finding;
use App\Models\FindingStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class FindingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('finding_access');

        if ($request->expectsJson()) {
            $findings = Finding::search($request)
                ->get();

            return response()->json($findings);
        }

        $findings = Finding::search($request)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $findingStatuses = FindingStatus::all();

        return Inertia::render('Finding/Index', [
            'findings' => FindingSimpleResource::collection($findings),
            'findingStatuses' => FindingStatusResource::collection($findingStatuses)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('finding_create');

        $finding_status = FindingStatus::all();

        return Inertia::render('Finding/Create', [
            'finding_status' => FindingStatusResource::collection($finding_status),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFindingRequest $request)
    {
        Gate::authorize('finding_create');
        $validated = $request->safe()->except(['attachment_before', 'attachment_after']);

        if ($request->hasFile('attachment_before')) {

            // OPEN FINDING
            $AttachmentBefore = uniqid() .  '.' . strtolower($request->file('attachment_before')->extension());
            $pathBefore = $request->file('attachment_before')->storeAs('findings', $AttachmentBefore, 'public');
            $validated['attachment_before'] = $pathBefore;
        } elseif ($request->hasFile('attachment_before') && $request->hasFile('attachment_after')) {

            // CLOSED FINDING
            $AttachmentBefore = uniqid() .  '.' . strtolower($request->file('attachment_before')->extension());
            $pathBefore = $request->file('attachment_before')->storeAs('findings', $AttachmentBefore, 'public');
            $validated['attachment_before'] = $pathBefore;

            $AttachmentAfter = uniqid() .  '.' . strtolower($request->file('attachment_after')->extension());
            $pathBefore = $request->file('attachment_after')->storeAs('findings', $AttachmentAfter, 'public');
            $validated['attachment_after'] = $pathBefore;
        }

        Finding::insert($validated);

        return redirect()
            ->route('findings.index')
            ->with('success', 'Successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Finding $finding)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Finding $finding)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Finding $finding)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Finding $finding)
    {
        //
    }
}
