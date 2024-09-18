<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Http\Resources\MaterialResource;
use App\Http\Resources\UnitOfMeasurementResource;
use App\Models\Material;
use App\Models\UnitOfMeasurement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('material_access');

        if ($request->expectsJson()) {
            $materials = Material::search($request)
                ->get();

            return response()->json($materials);
        }

        $materials = Material::search($request)
            ->paginate(10)
            ->withQueryString();

        $unitOfMeasurements = UnitOfMeasurement::all();

        return Inertia::render('Material/Index', [
            'materials' => MaterialResource::collection($materials),
            'unitOfMeasurements' => UnitOfMeasurementResource::collection($unitOfMeasurements),
        ]);
    }

    // public function search(Request $request)
    // {
    //     $materials = Material::search($request)
    //         ->get();

    //     return response()->json($materials);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('material_create');

        $unitOfMeasurements = UnitOfMeasurement::all();

        return Inertia::render('Material/Create', [
            'unitOfMeasurements' => UnitOfMeasurementResource::collection($unitOfMeasurements),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialRequest $request)
    {
        Gate::authorize('material_create');

        $validated = $request->validated();

        Material::insert($validated);

        return redirect()
            ->route('materials.edit', $validated['id'])
            ->with('success', 'Material successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        Gate::authorize('material_show');

        $unitOfMeasurements = UnitOfMeasurement::all();

        return Inertia::render('Material/Show', [
            'material' => MaterialResource::make($material),
            'unitOfMeasurements' => UnitOfMeasurementResource::collection($unitOfMeasurements),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Material $material)
    {
        Gate::authorize('material_edit');

        $unitOfMeasurements = UnitOfMeasurement::all();

        return Inertia::render('Material/Edit', [
            'material' => MaterialResource::make($material->load('equipments')),
            'unitOfMeasurements' => UnitOfMeasurementResource::collection($unitOfMeasurements),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        Gate::authorize('material_update');

        $validated = $request->validated();

        $material->id = $validated['id'];
        $material->title = $validated['title'];
        $material->price = $validated['price'];
        $material->unit_of_measurement_id = $validated['unit_of_measurement_id'];

        if ($material->isDirty()) {
            $material->update($validated);
        }

        return redirect()
            ->route('materials.edit', $material->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        Gate::authorize('material_delete');

        $material->delete();

        return redirect()
            ->route('materials.index')
            ->with('success', 'Material successfully deleted');
    }
}
