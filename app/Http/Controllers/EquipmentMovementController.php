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

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $keyword)
    {
        Gate::authorize('equipment_movement_access');

        $request->merge([
            'search' => $keyword,
        ]);

        $equipment_movements = EquipmentMovement::latest()
            ->search($request)
            ->paginate(10)
            ->withQueryString();

        if (empty($equipment_movements->data)) {
            return redirect()
                ->back()
                ->with('error', 'Equipment record not found');
        }

        return Inertia::render('EquipmentMovement/Index', [
            'equipment_movements' => EquipmentMovemementResource::collection($equipment_movements),
        ]);
    }
}
