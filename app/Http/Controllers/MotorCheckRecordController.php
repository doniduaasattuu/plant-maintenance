<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMotorCheckRecordRequest;
use App\Http\Requests\UpdateMotorCheckRecordRequest;
use App\Http\Resources\CleanlinessResource;
use App\Http\Resources\MotorCheckRecordResource;
use App\Http\Resources\NormalityResource;
use App\Http\Resources\OperationalStatusResource;
use App\Models\Cleanliness;
use App\Models\MotorCheckRecord;
use App\Models\Normality;
use App\Models\OperationalStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class MotorCheckRecordController extends Controller
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
        Gate::authorize('motor_check_record_create');

        $equipment_id = $request->equipment_id;
        $operational_statuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $normality = Normality::all();

        return Inertia::render('MotorCheckRecord/Create', [
            'equipment_id' => $equipment_id,
            'operational_statuses' => OperationalStatusResource::collection($operational_statuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'normality' => NormalityResource::collection($normality),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMotorCheckRecordRequest $request)
    {
        Gate::authorize('motor_check_record_create');

        $validated = $request->validated();
        MotorCheckRecord::insert($validated);

        return redirect()
            ->route('motor-check-records.edit', [
                'motor_check_record' => MotorCheckRecord::latest()->first()->id,
            ])
            ->with('success', 'Motor record successfully saved');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MotorCheckRecord $motorCheckRecord)
    {
        Gate::authorize('motor_check_record_edit');

        $operational_statuses = OperationalStatus::all();
        $cleanliness = Cleanliness::all();
        $normality = Normality::all();

        return Inertia::render('MotorCheckRecord/Edit', [
            'motor_check_record' => MotorCheckRecordResource::make($motorCheckRecord),
            'operational_statuses' => OperationalStatusResource::collection($operational_statuses),
            'cleanliness' => CleanlinessResource::collection($cleanliness),
            'normality' => NormalityResource::collection($normality),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMotorCheckRecordRequest $request, MotorCheckRecord $motorCheckRecord)
    {
        Gate::authorize('motor_check_record_update');

        $validated = $request->validated();

        $motorCheckRecord->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
