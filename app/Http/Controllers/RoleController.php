<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('role_access');

        $roles = Role::paginate(10);

        return Inertia::render('Role/Index', [
            'roles' => RoleResource::collection($roles),
        ]);
    }

    public function create()
    {
        Gate::authorize('role_create');

        $permissions = PermissionResource::collection(Permission::all());
        return Inertia::render('Role/Create', [
            'permissions' => $permissions,
        ]);
    }

    public function edit(Role $role)
    {
        Gate::authorize('role_edit');

        $role->load('permissions');
        $permissions = PermissionResource::collection(Permission::all());

        return Inertia::render('Role/Edit', [
            'role' => RoleResource::make($role),
            'permissions' => $permissions,
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        Gate::authorize('role_update');

        $permissions = collect($request->selectedPermissions)->map(function ($permission) {
            return $permission['value'];
        });

        $role->permissions()->sync($permissions);

        $role->update($request->validated());

        return redirect()
            ->back();
    }

    public function store(StoreRoleRequest $request)
    {
        Gate::authorize('role_create');

        $role = Role::create($request->validated());

        $permissions = collect($request->selectedPermissions)->map(function ($permission) {
            return $permission['value'];
        });

        $role->permissions()->sync($permissions);

        return redirect()
            ->route('roles.edit', [
                'role' => $role->id,
            ])
            ->with('success', 'Role successfully created');
    }

    public function show(Role $role)
    {
        Gate::authorize('role_show');
    }

    public function destroy(Role $role)
    {
        Gate::authorize('role_delete');

        $role->delete();

        return redirect()
            ->route('roles.index')
            ->with('success', 'Role successfully deleted');
    }
}
