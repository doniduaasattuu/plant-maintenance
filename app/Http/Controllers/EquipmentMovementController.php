<?php

namespace App\Http\Controllers;

use App\Models\EquipmentMovement;
use App\Http\Controllers\Controller;
use App\Http\Resources\EquipmentMovemementResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class EquipmentMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('equipment_movement_access');

        $equipment_movements = EquipmentMovement::latest()
            ->search($request)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('EquipmentMovement/Index', [
            'equipment_movements' => EquipmentMovemementResource::collection($equipment_movements),
        ]);
    }

    public function show()
    {
        //
    }

    public function filter(Request $request)
    {
        Gate::authorize('equipment_movement_access');

        $equipment_movements = EquipmentMovement::latest()
            ->search($request)
            ->paginate(10)
            ->withQueryString();

        if ($equipment_movements->isEmpty()) {
            abort(204);
        }

        return Inertia::render('EquipmentMovement/Filter', [
            'equipment_movements' => EquipmentMovemementResource::collection($equipment_movements),
        ]);
    }
}
