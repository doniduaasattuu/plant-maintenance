<?php

use App\Models\User;
use Database\Seeders\DepartmentSeeder;
use Database\Seeders\DivisionSeeder;
use Database\Seeders\PermissionRoleTableSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\PositionSeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\RoleUserTableSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\WorkCenterSeeder;

describe("users management", function () {

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
        ]);
    });

    it('users management screen can be rendered', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->get('/users');

        $response->assertOk();
    });
});
