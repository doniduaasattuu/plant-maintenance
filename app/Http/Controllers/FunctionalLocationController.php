<?php

namespace App\Http\Controllers;

use App\Models\FunctionalLocation;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFunctionalLocationRequest;
use App\Http\Requests\UpdateFunctionalLocationRequest;
use App\Http\Resources\FunctionalLocationResource;
use FFI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class FunctionalLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('functional_location_access');

        $functional_locations = FunctionalLocation::search($request)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('FunctionalLocation/Index', [
            'functional_locations' => FunctionalLocationResource::collection($functional_locations),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('functional_location_create');

        return Inertia::render('FunctionalLocation/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFunctionalLocationRequest $request)
    {
        Gate::authorize('functional_location_create');

        FunctionalLocation::create($request->validated());

        return redirect()
            ->route('functional-locations.index')
            ->with('success', 'Functional location successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(FunctionalLocation $functionalLocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FunctionalLocation $functionalLocation)
    {
        Gate::authorize('functional_location_edit');

        return Inertia::render('FunctionalLocation/Edit', [
            'functional_location' => FunctionalLocationResource::make($functionalLocation),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFunctionalLocationRequest $request, FunctionalLocation $functionalLocation)
    {
        Gate::authorize('functional_location_update');

        $validated = $request->validated();
        $validated['updated_by'] = auth()->user()->id;
        $validated['updated_at'] = now();

        $functionalLocation->update($validated);

        return redirect()
            ->back()
            ->with('success', 'Functional location successfully updated');

        // return redirect()
        //     ->route('functional-locations.index')
        //     ->with('success', 'Functional location successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FunctionalLocation $functionalLocation)
    {
        Gate::authorize('functional_location_delete');

        $functionalLocation->delete();

        return redirect()
            ->route('functional-locations.index')
            ->with('success', 'Functional location successfully deleted');
    }
}
