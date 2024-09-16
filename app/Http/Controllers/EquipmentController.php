<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Http\Resources\ClassificationResource;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\EquipmentStatusResource;
use App\Models\Classification;
use App\Models\Equipment;
use App\Models\EquipmentStatus;
use App\Services\EquipmentMovementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    private $equipmentMovementService;

    public function __construct(EquipmentMovementService $equipmentMovementService)
    {
        $this->equipmentMovementService = $equipmentMovementService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('equipment_access');

        $equipments = Equipment::search($request)
            ->paginate(10)
            ->withQueryString();

        $classifications = Classification::all();
        $equipment_status = EquipmentStatus::all();

        return Inertia::render('Equipment/Index', [
            'equipments' => EquipmentResource::collection($equipments),
            'classifications' => ClassificationResource::collection($classifications),
            'equipment_status' => EquipmentStatusResource::collection($equipment_status),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('equipment_create');

        $classifications = Classification::all();
        $equipment_status = EquipmentStatus::all();

        return Inertia::render('Equipment/Create', [
            'classifications' => ClassificationResource::collection($classifications),
            'equipment_status' => EquipmentStatusResource::collection($equipment_status),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentRequest $request)
    {
        Gate::authorize('equipment_create');

        $validated = $request->validated();

        Equipment::insert($validated);
        $this->equipmentMovementService->logEquipmentMovement($request->validated());

        return redirect()
            ->route('equipments.edit', [
                'equipment' => $validated['id']
            ])
            ->with('success', 'Equipment successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipment $equipment)
    {
        Gate::authorize('equipment_show');

        $classifications = Classification::all();
        $equipment_status = EquipmentStatus::all();

        return Inertia::render('Equipment/Show', [
            'equipment' => EquipmentResource::make($equipment),
            'classifications' => ClassificationResource::collection($classifications),
            'equipment_status' => EquipmentStatusResource::collection($equipment_status),
            'links' => $equipment->links,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipment $equipment)
    {
        Gate::authorize('equipment_edit');

        $classifications = Classification::all();
        $equipment_status = EquipmentStatus::all();

        return Inertia::render('Equipment/Edit', [
            'equipment' => EquipmentResource::make($equipment),
            'classifications' => ClassificationResource::collection($classifications),
            'equipment_status' => EquipmentStatusResource::collection($equipment_status),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, Equipment $equipment)
    {
        Gate::authorize('equipment_update');

        $validated = $request->validated();

        $equipment->id = $validated['id'];
        $equipment->classification_id = $validated['classification_id'];
        $equipment->equipment_status_id = $validated['equipment_status_id'];
        $equipment->functional_location_id = $validated['functional_location_id'];
        $equipment->sort_field = $validated['sort_field'];
        $equipment->description = $validated['description'];

        if ($equipment->isDirty()) {
            $this->equipmentMovementService->logEquipmentMovement($request->validated());
            $equipment->update($validated);
        };

        return redirect()
            ->route('equipments.edit', $equipment->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        Gate::authorize('equipment_delete');

        $equipment->delete();

        return redirect()
            ->route('equipments.index')
            ->with('success', 'Equipment successfully deleted');
    }
}
