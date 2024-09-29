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
            'motor_check_record_create',
            'motor_check_record_store',
            'motor_check_record_show',
            'motor_check_record_edit',
            'motor_check_record_update',
            'motor_check_trend_access',
            'ac_check_record_create',
            'ac_check_record_store',
            'ac_check_record_show',
            'ac_check_record_edit',
            'ac_check_record_update',
            'ac_check_trend_access',
            'document_create',
            // 'document_edit',
            'document_show',
            // 'document_update',
            // 'document_delete',
            'document_access',
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
