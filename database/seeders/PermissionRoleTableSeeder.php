<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin_permissions = Permission::all();
        $user_permissions = Permission::whereIn('title', [
            'profile_edit',
            'profile_update',
        ])->get();

        // $management_permissions = $user_permissions->merge(Permission::whereIn('title', [
        //     'user_access',
        // ])->get());

        Role::find(1)->permissions()->attach($admin_permissions);
        Role::find(2)->permissions()->attach($user_permissions);
        // Role::find(3)->permissions()->attach($management_permissions);
    }
}
