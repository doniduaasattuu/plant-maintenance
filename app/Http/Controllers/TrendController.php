<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\EquipmentCheckingForm;
use App\Services\TrendService;
use Illuminate\Http\Request;

class TrendController extends Controller
{
    private $trendService;

    public function __construct(TrendService $trendService)
    {
        $this->trendService = $trendService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // 
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
    public function show(string $equipment_id)
    {
        $equipment = Equipment::find($equipment_id);
        $equipmentChecks = EquipmentCheckingForm::where('equipment_id', $equipment_id)
            ->with('formable')
            ->limit(12)
            ->orderBy('created_at', 'DESC')
            ->get();

        if ($equipmentChecks->isEmpty() || is_null($equipment)) {
            abort(204);
        }

        return $this->trendService->generate($equipment, $equipmentChecks->reverse()->pluck('formable'));
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
