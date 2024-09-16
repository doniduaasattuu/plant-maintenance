<?php

namespace App\Http\Controllers;

use App\Models\AcCheck;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAcCheckRequest;
use App\Http\Requests\UpdateAcCheckRequest;
use App\Http\Resources\AcCheckResource;
use App\Http\Resources\CleanlinessResource;
use App\Http\Resources\ConfirmationResource;
use App\Http\Resources\GoodnessResource;
use App\Http\Resources\NormalityResource;
use App\Http\Resources\OperationalStatusResource;
use App\Http\Resources\Simple\AcCheckSimpleResource;
use App\Models\Cleanliness;
use App\Models\Confirmation;
use App\Models\EquipmentCheckingForm;
use App\Models\Goodness;
use App\Models\Normality;
use App\Models\OperationalStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AcCheckController extends Controller
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
        Gate::authorize('ac_check_create');

        $equipment_id = $request->equipment_id;
        $operationalStatuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $confirmations = Confirmation::all();
        $goodness = Goodness::all();

        return Inertia::render('Checks/Ac/Create', [
            'equipment_id' => $equipment_id,
            'operationalStatuses' => OperationalStatusResource::collection($operationalStatuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'confirmations' => ConfirmationResource::collection($confirmations),
            'goodness' => GoodnessResource::collection($goodness),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAcCheckRequest $request)
    {
        Gate::authorize('ac_check_create');

        $validated = $request->validated();
        $acCheck = AcCheck::create($validated);

        EquipmentCheckingForm::create([
            'equipment_id' => $validated['equipment_id'],
            'formable_id' => $acCheck->id,
            'formable_type' => 'ac_check',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()
            ->route('ac-check.edit', $acCheck->id)
            ->with('success', 'Successfully saved');
    }

    /**
     * Display the specified resource.
     */
    public function show(AcCheck $acCheck)
    {
        Gate::authorize('ac_check_show');

        $operationalStatuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $confirmations = Confirmation::all();
        $goodness = Goodness::all();

        return Inertia::render('Checks/Ac/Show', [
            'acCheck' => AcCheckResource::make($acCheck),
            'operationalStatuses' => OperationalStatusResource::collection($operationalStatuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'confirmations' => ConfirmationResource::collection($confirmations),
            'goodness' => GoodnessResource::collection($goodness),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AcCheck $acCheck)
    {
        Gate::authorize('ac_check_edit');

        $operationalStatuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $confirmations = Confirmation::all();
        $goodness = Goodness::all();

        return Inertia::render('Checks/Ac/Edit', [
            'acCheck' => AcCheckSimpleResource::make($acCheck),
            'operationalStatuses' => OperationalStatusResource::collection($operationalStatuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'confirmations' => ConfirmationResource::collection($confirmations),
            'goodness' => GoodnessResource::collection($goodness),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAcCheckRequest $request, AcCheck $acCheck)
    {
        Gate::authorize('ac_check_update');

        $acCheck->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcCheck $acCheck)
    {
        Gate::authorize('ac_check_delete');
    }
}
