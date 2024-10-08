<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // PROFILE
            [
                'title' => 'profile_edit',
            ],
            [
                'title' => 'profile_update',
            ],
            [
                'title' => 'profile_delete',
            ],
            // DOCUMENT
            [
                'title' => 'document_create',
            ],
            [
                'title' => 'document_edit',
            ],
            [
                'title' => 'document_show',
            ],
            [
                'title' => 'document_update',
            ],
            [
                'title' => 'document_delete',
            ],
            [
                'title' => 'document_access',
            ],
            // USER
            [
                'title' => 'user_create',
            ],
            [
                'title' => 'user_edit',
            ],
            [
                'title' => 'user_show',
            ],
            [
                'title' => 'user_update',
            ],
            [
                'title' => 'user_delete',
            ],
            [
                'title' => 'user_access',
            ],
            [
                'title' => 'user_reset',
            ],
            // ROLE
            [
                'title' => 'role_create',
            ],
            [
                'title' => 'role_edit',
            ],
            [
                'title' => 'role_show',
            ],
            [
                'title' => 'role_update',
            ],
            [
                'title' => 'role_delete',
            ],
            [
                'title' => 'role_access',
            ],
            // FUNCTIONAL LOCATION
            [
                'title' => 'functional_location_access'
            ],
            [
                'title' => 'functional_location_create',
            ],
            [
                'title' => 'functional_location_edit',
            ],
            [
                'title' => 'functional_location_show',
            ],
            [
                'title' => 'functional_location_update',
            ],
            [
                'title' => 'functional_location_delete',
            ],
            // EQUIPMENT
            [
                'title' => 'equipment_access'
            ],
            [
                'title' => 'equipment_create',
            ],
            [
                'title' => 'equipment_edit',
            ],
            [
                'title' => 'equipment_show',
            ],
            [
                'title' => 'equipment_update',
            ],
            [
                'title' => 'equipment_delete',
            ],
            // EQUIPMENT MOVEMENT
            [
                'title' => 'equipment_movement_access'
            ],
            [
                'title' => 'equipment_movement_create',
            ],
            [
                'title' => 'equipment_movement_edit',
            ],
            [
                'title' => 'equipment_movement_show',
            ],
            [
                'title' => 'equipment_movement_update',
            ],
            [
                'title' => 'equipment_movement_delete',
            ],
            // MATERIAL
            [
                'title' => 'material_access'
            ],
            [
                'title' => 'material_create',
            ],
            [
                'title' => 'material_edit',
            ],
            [
                'title' => 'material_show',
            ],
            [
                'title' => 'material_update',
            ],
            [
                'title' => 'material_delete',
            ],
            // FINDING
            [
                'title' => 'finding_access'
            ],
            [
                'title' => 'finding_create',
            ],
            [
                'title' => 'finding_edit',
            ],
            [
                'title' => 'finding_show',
            ],
            [
                'title' => 'finding_update',
            ],
            [
                'title' => 'finding_delete',
            ],
            // MOTOR CHECK RECORD
            [
                'title' => 'motor_check_access'
            ],
            [
                'title' => 'motor_check_create',
            ],
            [
                'title' => 'motor_check_edit',
            ],
            [
                'title' => 'motor_check_show',
            ],
            [
                'title' => 'motor_check_update',
            ],
            [
                'title' => 'motor_check_delete',
            ],
            // AC CHECK RECORD
            [
                'title' => 'ac_check_access'
            ],
            [
                'title' => 'ac_check_create',
            ],
            [
                'title' => 'ac_check_edit',
            ],
            [
                'title' => 'ac_check_show',
            ],
            [
                'title' => 'ac_check_update',
            ],
            [
                'title' => 'ac_check_delete',
            ],
            // APAR CHECK RECORD
            [
                'title' => 'apar_check_access'
            ],
            [
                'title' => 'apar_check_create',
            ],
            [
                'title' => 'apar_check_edit',
            ],
            [
                'title' => 'apar_check_show',
            ],
            [
                'title' => 'apar_check_update',
            ],
            [
                'title' => 'apar_check_delete',
            ],
            // TREND
            [
                'title' => 'trend_show'
            ],
            // QR SCAN
            [
                'title' => 'qr_scan',
            ],
            // EXPORT
            [
                'title' => 'export',
            ]
        ];

        Permission::insert($permissions);
    }
}
