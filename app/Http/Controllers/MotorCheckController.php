<?php

namespace App\Http\Controllers;

use App\Models\MotorCheck;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMotorCheckRequest;
use App\Http\Requests\UpdateMotorCheckRequest;
use App\Http\Resources\CleanlinessResource;
use App\Http\Resources\MotorCheckResource;
use App\Http\Resources\NormalityResource;
use App\Http\Resources\OperationalStatusResource;
use App\Http\Resources\Simple\MotorCheckSimpleResource;
use App\Models\Cleanliness;
use App\Models\EquipmentCheckingForm;
use App\Models\Normality;
use App\Models\OperationalStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class MotorCheckController extends Controller
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
        Gate::authorize('motor_check_create');

        $equipment_id = $request->equipment_id;
        $operational_statuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $normality = Normality::all();

        return Inertia::render('Checks/Motor/Create', [
            'equipment_id' => $equipment_id,
            'operational_statuses' => OperationalStatusResource::collection($operational_statuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'normality' => NormalityResource::collection($normality),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMotorCheckRequest $request)
    {
        Gate::authorize('motor_check_create');

        $validated = $request->validated();
        $motorCheck = MotorCheck::create($validated);

        EquipmentCheckingForm::create([
            'equipment_id' => $validated['equipment_id'],
            'formable_id' => $motorCheck->id,
            'formable_type' => 'motor_check',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()
            ->route('motor-check.edit', $motorCheck->id)
            ->with('success', 'Successfully saved');
    }

    /**
     * Display the specified resource.
     */
    public function show(MotorCheck $motorCheck)
    {
        Gate::authorize('motor_check_show');

        $operationalStatuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $normality = Normality::all();

        return Inertia::render('Checks/Motor/Show', [
            'motorCheck' => MotorCheckResource::make($motorCheck),
            'operationalStatuses' => OperationalStatusResource::collection($operationalStatuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'normality' => NormalityResource::collection($normality),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MotorCheck $motorCheck)
    {
        Gate::authorize('motor_check_edit');

        $operationalStatuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $normality = Normality::all();

        return Inertia::render('Checks/Motor/Edit', [
            'motorCheck' => MotorCheckSimpleResource::make($motorCheck),
            'operationalStatuses' => OperationalStatusResource::collection($operationalStatuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'normality' => NormalityResource::collection($normality),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMotorCheckRequest $request, MotorCheck $motorCheck)
    {
        Gate::authorize('motor_check_update');

        $motorCheck->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MotorCheck $motorCheck)
    {
        Gate::authorize('motor_check_update');

        $motorCheck->delete();
    }
}
