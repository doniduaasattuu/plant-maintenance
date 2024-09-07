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
        ];

        Permission::insert($permissions);
    }
}
