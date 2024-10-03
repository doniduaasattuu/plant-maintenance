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
            'functional_location_access',
            'functional_location_show',
            'equipment_access',
            'equipment_show',
            'material_access',
            'material_show',
            'equipment_movement_access',
            'motor_check_access',
            'motor_check_create',
            'motor_check_edit',
            'motor_check_show',
            'motor_check_update',
            'motor_check_delete',
            'ac_check_access',
            'ac_check_create',
            'ac_check_edit',
            'ac_check_show',
            'ac_check_update',
            'ac_check_delete',
            'trend_show',
            'document_create',
            'document_show',
            'document_access',
            'finding_create',
            'finding_show',
            'finding_access',
            'trend_show',
            'qr_scan',
        ])->get();

        // $management_permissions = $user_permissions->merge(Permission::whereIn('title', [
        //     'user_access',
        // ])->get());

        Role::find(1)->permissions()->attach($admin_permissions);
        Role::find(2)->permissions()->attach($user_permissions);
        // Role::find(3)->permissions()->attach($management_permissions);
    }
}
