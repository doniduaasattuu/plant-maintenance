<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\PositionResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\WorkCenterResource;
use App\Models\Department;
use App\Models\Position;
use App\Models\Role;
use App\Models\User;
use App\Models\WorkCenter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('user_access');

        $users = User::search($request)
            ->paginate(6)
            ->withQueryString();

        $departments = Department::all();

        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
            'departments' => DepartmentResource::collection($departments),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('user_create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('user_create');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        Gate::authorize('user_show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        Gate::authorize('user_edit');

        $departments = Department::all();
        $roles = Role::all();
        $positions = Position::all();
        $work_centers = WorkCenter::all();

        return Inertia::render('User/Edit', [
            'user' => $user->load('roles'),
            'roles' => RoleResource::collection($roles),
            'departments' => DepartmentResource::collection($departments),
            'positions' => PositionResource::collection($positions),
            'work_centers' => WorkCenterResource::collection($work_centers),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        Gate::authorize('user_update');

        $roles = collect($request->roles)->map(function ($role) {
            return $role['value'];
        });

        $user->roles()->sync($roles);
        $user->update($request->validated());

        return redirect()
            ->back();
        // ->with('success', 'User successfully updated');
    }

    /**
     * Update the specified resource in storage.
     */
    public function reset(User $user)
    {
        Gate::authorize('user_reset');

        $user->update([
            'password' => Hash::make(config('auth.default_password')),
        ]);

        return redirect()
            ->back()
            ->with('success', 'User password successfully reset');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('user_delete');

        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'User successfully deleted');
    }
}
