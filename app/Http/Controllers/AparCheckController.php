<?php

namespace App\Http\Controllers;

use App\Models\AparCheck;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAparCheckRequest;
use App\Http\Requests\UpdateAparCheckRequest;
use App\Http\Resources\GoodnessResource;
use App\Http\Resources\RustinessResource;
use App\Http\Resources\Simple\AparCheckSimpleResource;
use App\Models\EquipmentCheckingForm;
use App\Models\Goodness;
use App\Models\Rustiness;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AparCheckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        Gate::authorize('apar_check_create');

        $equipment_id = $request->equipment_id;
        $goodness = Goodness::all();
        $rustiness = Rustiness::all();

        return Inertia::render('Checks/Apar/Create', [
            'equipment_id' => $equipment_id,
            'goodness' => GoodnessResource::collection($goodness),
            'rustiness' => RustinessResource::collection($rustiness),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAparCheckRequest $request)
    {
        Gate::authorize('apar_check_create');

        $validated = $request->validated();
        $aparCheck = AparCheck::create($validated);

        EquipmentCheckingForm::create([
            'equipment_id' => $validated['equipment_id'],
            'formable_id' => $aparCheck->id,
            'formable_type' => 'apar_check',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()
            ->route('apar-check.edit', $aparCheck->id)
            ->with('success', 'Successfully saved');
    }

    /**
     * Display the specified resource.
     */
    public function show(AparCheck $aparCheck)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AparCheck $aparCheck)
    {
        Gate::authorize('apar_check_edit');

        $goodness = Goodness::all();
        $rustiness = Rustiness::all();

        return Inertia::render('Checks/Apar/Edit', [
            'aparCheck' => AparCheckSimpleResource::make($aparCheck),
            'goodness' => GoodnessResource::collection($goodness),
            'rustiness' => RustinessResource::collection($rustiness),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAparCheckRequest $request, AparCheck $aparCheck)
    {
        Gate::authorize('apar_check_update');

        $aparCheck->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AparCheck $aparCheck)
    {
        //
    }
}
