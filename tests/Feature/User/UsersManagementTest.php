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
            ->get('/users')
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("User/Index")
                    ->has("can")
                    ->has("users.data", 4)
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
        $admin = User::find("55000154");
        $this->assertNotNull($admin);
        $user = User::find("55000153");

        $response = $this
            ->actingAs($admin)
            ->from(route('users.edit', $user->id))
            ->patch(route('users.update', $user->id), [
                "first_name" => "Eko",
                "email" => "eko@gmail.com"
            ]);

        $response->assertRedirect(route('users.edit', $user->id));
        $response->assertStatus(302);
        $this->assertEquals("Eko", $user->refresh()->first_name);
    });

    test('can filter user by department', function () {
        $admin = User::find("55000154");
        $this->assertNotNull($admin);

        $this
            ->actingAs($admin)
            ->get('/users?department=EI6')
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("User/Index")
                    ->has("users.data", 1)
            );
    });

    test('not found filter user by department', function () {
        $admin = User::find("55000154");
        $this->assertNotNull($admin);

        $this
            ->actingAs($admin)
            ->get('/users?department=EI4')
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("User/Index")
                    ->has("users.data", 0)
            );
    });

    test('can filter user by search', function () {
        $admin = User::find("55000154");
        $this->assertNotNull($admin);

        $this
            ->actingAs($admin)
            ->get('/users?search=Doni')
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("User/Index")
                    ->has("users.data", 1)
            );
    });

    test('not found filter user by search', function () {
        $admin = User::find("55000154");
        $this->assertNotNull($admin);

        $this
            ->actingAs($admin)
            ->get('/users?search=x')
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("User/Index")
                    ->has("users.data", 0)
            );
    });
});
