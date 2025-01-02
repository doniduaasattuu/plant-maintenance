<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe('equipment movement test', function () {

    beforeEach(function () {
        $this->seed([
            DivisionSeeder::class,
            DepartmentSeeder::class,
            PositionSeeder::class,
            WorkCenterSeeder::class,
            UserSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            PermissionRoleTableSeeder::class,
            RoleUserTableSeeder::class,
            FunctionalLocationSeeder::class,
            ClassificationSeeder::class,
            EquipmentStatusSeeder::class,
            EquipmentSeeder::class,
            MovementStatusSeeder::class,
            EquipmentMovementSeeder::class,
        ]);
    });

    test('equipment movement page should be rendered', function () {
        $admin = User::find('55000154');

        $response = $this
            ->actingAs($admin)
            ->get('/equipment-movements');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('EquipmentMovement/Index')
                ->has('equipmentMovements.data', 10)
        );
    });
});
