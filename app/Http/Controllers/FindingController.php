<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFindingRequest;
use App\Http\Requests\UpdateFindingRequest;
use App\Http\Resources\FindingResource;
use App\Http\Resources\FindingStatusResource;
use App\Http\Resources\Simple\FindingSimpleResource;
use App\Models\Finding;
use App\Models\FindingStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
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
            ->orderBy('id', 'DESC')
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
    public function create(Request $request)
    {
        Gate::authorize('finding_create');

        $findingStatuses = FindingStatus::all();

        return Inertia::render('Finding/Create', [
            'findingStatuses' => FindingStatusResource::collection($findingStatuses),
            'equipment_id' => $request->equipment_id,
            'functional_location_id' => $request->functional_location_id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFindingRequest $request)
    {
        Gate::authorize('finding_create');
        $validated = $request->safe()->except(['attachment_before', 'attachment_after']);

        if ($request->hasFile('attachment_before') && !$request->hasFile('attachment_after')) {

            // OPEN FINDING
            $attachmentBefore = fake()->uuid() .  '.' . strtolower($request->file('attachment_before')->extension());
            $pathBefore = $request->file('attachment_before')->storeAs('findings', $attachmentBefore, 'public');
            $validated['attachment_before'] = $pathBefore;
        } else if ($request->hasFile('attachment_before') && $request->hasFile('attachment_after')) {

            // CLOSED FINDING
            $attachmentBefore = fake()->uuid() .  '.' . strtolower($request->file('attachment_before')->extension());
            $pathBefore = $request->file('attachment_before')->storeAs('findings', $attachmentBefore, 'public');
            $validated['attachment_before'] = $pathBefore;

            $attachmentAfter = fake()->uuid() .  '.' . strtolower($request->file('attachment_after')->extension());
            $pathAfter = $request->file('attachment_after')->storeAs('findings', $attachmentAfter, 'public');
            $validated['attachment_after'] = $pathAfter;
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
        if (!Gate::allows('finding_edit') && !Gate::allows('update', $finding)) {
            abort(403);
        }

        $findingStatuses = FindingStatus::all();

        return Inertia::render('Finding/Edit', [
            'finding' => FindingResource::make($finding),
            'findingStatuses' => FindingStatusResource::collection($findingStatuses),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFindingRequest $request, Finding $finding)
    {
        if (!Gate::allows('finding_update') && !Gate::allows('update', $finding)) {
            abort(403);
        }

        $validated = $request->safe()->except('attachment_after');

        if ($request->hasFile('attachment_after')) {

            if ($finding->attachment_after) {
                Storage::disk('public')->delete($finding->attachment_after);
            }

            $attachmentAfter = fake()->uuid() .  '.' . strtolower($request->file('attachment_after')->extension());
            $pathAfter = $request->file('attachment_after')->storeAs('findings', $attachmentAfter, 'public');
            $validated['attachment_after'] = $pathAfter;
        }

        $finding->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Finding $finding)
    {
        if (!Gate::allows('finding_delete') && !Gate::allows('delete', $finding)) {
            abort(403);
        }

        Storage::disk('public')->delete($finding->attachment_before);
        Storage::disk('public')->delete($finding->attachment_after);

        $finding->delete();

        return redirect()
            ->back()
            ->with('success', 'Finding successfully deleted');
    }
}
