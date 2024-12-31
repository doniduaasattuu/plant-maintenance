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
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

describe("admin users management", function () {

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

    test('users management screen can be rendered', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->get('/users');

        $response->assertInertia(
            fn(Assert $page) =>
            $page->component("User/Index")
                ->has("can")
                ->has("users", 3)
                ->has("departments.data", 16)
        );

        $response->assertOk();
    });

    test('can reset user password', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->from("/users")
            ->patch("/users/reset/55000153");

        $response->assertSessionHasNoErrors('password');
        $this->assertEquals(session('success'), 'User password successfully reset');
        $response->assertStatus(302);
        $this->assertTrue(Hash::check(config('auth.default_password'), $user->refresh()->password));
    });

    test('update user screen can be rendered', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->get("/users/55000153/edit");

        $response->assertInertia(
            fn(Assert $page) =>
            $page->component("User/Edit")
                ->has("user")
        );

        $response->assertOk();
    });

    test('can update user', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->patch("/users/55000153", [
                "first_name" => "Eko"
            ]);

        $response->assertStatus(302);
    });
});
