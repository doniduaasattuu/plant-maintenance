<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\MotorCheckRecord;
use App\Models\OperationalStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class MotorCheckTrendController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('motor_check_trend_access');
        $equipment_id = $request->equipment_id;

        if (is_null(Equipment::find($equipment_id))) {
            abort(404);
        }

        $data = MotorCheckRecord::query()
            ->where('equipment_id', $equipment_id)
            ->orderBy('created_at', 'DESC')
            ->limit(11)
            ->get();

        $operational_status = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'Status' => $motorCheckRecord->operational_status_id == 1 ? $motorCheckRecord->operational_status_id : 0,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $cleanliness = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'Cleanliness' => $motorCheckRecord->cleanliness_id == 1 ? $motorCheckRecord->cleanliness_id : 0,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $operational_cleanliness = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'Status' => $motorCheckRecord->operational_status_id == 1 ? $motorCheckRecord->operational_status_id : 0,
                'Cleanliness' => $motorCheckRecord->cleanliness_id == 1 ? $motorCheckRecord->cleanliness_id : 0,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $temperatures = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'DE' => $motorCheckRecord->temperature_de,
                'Body' => $motorCheckRecord->temperature_body,
                'NDE' => $motorCheckRecord->temperature_nde,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $de_vibration = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'DEV' => $motorCheckRecord->vibration_dev,
                'DEH' => $motorCheckRecord->vibration_deh,
                'DEA' => $motorCheckRecord->vibration_dea,
                'DEF' => $motorCheckRecord->vibration_def,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $noise_de = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'Noise_DE' => $motorCheckRecord->noise_de == 1 ? $motorCheckRecord->noise_de : 0,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $nde_vibration = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'NDEV' => $motorCheckRecord->vibration_ndev,
                'NDEH' => $motorCheckRecord->vibration_ndeh,
                'NDEF' => $motorCheckRecord->vibration_ndef,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $noise_nde = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'Noise_NDE' => $motorCheckRecord->noise_nde == 1 ? $motorCheckRecord->noise_nde : 0,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        $number_of_greasing = $data->map(function (MotorCheckRecord $motorCheckRecord, int $index) {
            return [
                'Greasing' => $motorCheckRecord->number_of_greasing,
                'Date' => $motorCheckRecord->created_at->format('d/m/y')
            ];
        });

        return Inertia::render('MotorCheckTrend/Index', [
            'equipment_id' => $equipment_id,
            'operational_status' => $operational_status,
            'cleanliness' => $cleanliness,
            'temperatures' => $temperatures,
            'de_vibration' => $de_vibration,
            'noise_de' => $noise_de,
            'nde_vibration' => $nde_vibration,
            'noise_nde' => $noise_nde,
            'number_of_greasing' => $number_of_greasing,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
