<?php

use App\Models\Role;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe('role management', function () {

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

    test('roles management screen can be rendered', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->get('/roles')
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("Role/Index")
                    ->has("roles.data", 2)
            );

        $response->assertOk();
    });

    test('can edit role', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->get('/roles/2/edit') // User
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("Role/Edit")
                    ->has("permissions.data", 73)
            );

        $response->assertOk();
    });

    test('can update role title', function () {
        $user = User::find("55000154");
        $userRole = Role::find("2");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->from('/roles/2/edit') // User
            ->patch('/roles/2', [
                'title' => 'New User',
            ]);

        $this->assertNotEquals($userRole->title, $userRole->refresh()->title);
        $response->assertStatus(302);
    });

    test('create new role can be rendered', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->get('/roles/create')
            ->assertInertia(
                fn(Assert $page) =>
                $page->component("Role/Create")
                    ->has("permissions")
            );

        $response->assertOk();
    });

    test('can store new role', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->from('/roles/create')
            ->post('/roles', [
                'title' => 'New role'
            ]);

        $response->assertStatus(302);
        $this->assertEquals(session('success'), 'Role successfully created');
    });

    test('can delete role', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->from('/roles')
            ->delete('/roles/2');

        $response->assertStatus(302);
        $this->assertEquals(session('success'), 'Role successfully deleted');
        $this->assertNull(Role::find(2));
    });

    test('failed to delete role not found', function () {
        $user = User::find("55000154");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->from('/roles')
            ->delete('/roles/4');

        $response->assertStatus(404);
    });
});
