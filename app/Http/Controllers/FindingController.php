<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFindingRequest;
use App\Http\Resources\FindingStatusResource;
use App\Models\Finding;
use App\Models\FindingStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class FindingController extends Controller
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
    public function create()
    {
        Gate::authorize('finding_create');

        $finding_status = FindingStatus::all();

        return Inertia::render('Finding/Create', [
            'finding_status' => FindingStatusResource::collection($finding_status),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFindingRequest $request)
    {
        Gate::authorize('finding_create');

        dd($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Finding $finding)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Finding $finding)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Finding $finding)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Finding $finding)
    {
        //
    }
}
