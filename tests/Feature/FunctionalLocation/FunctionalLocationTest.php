<?php

use App\Models\FunctionalLocation;
use App\Models\User;
use Database\Seeders\DepartmentSeeder;
use Database\Seeders\DivisionSeeder;
use Database\Seeders\FunctionalLocationSeeder;
use Database\Seeders\PermissionRoleTableSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\PositionSeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\RoleUserTableSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\WorkCenterSeeder;
use Inertia\Testing\AssertableInertia as Assert;

describe("admin functional location management", function () {

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
            FunctionalLocationSeeder::class
        ]);
    });

    test('functional location page can be rendered', function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('FunctionalLocation/Index')
                ->has('functionalLocations')
        );
    });

    test('create new functional location page can be rendered', function () {
        $user = User::find("55000154");

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations/create');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('FunctionalLocation/Create')
        );
    });

    test('can show functional location', function () {
        $user = User::find("55000154");

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations/FP-01-PM3');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('FunctionalLocation/Show')
                ->has('functional_location')
                ->has('functional_location.data.equipments')
        );
    });

    test('edit functional location page can be rendered', function () {
        $user = User::find("55000154");

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations/FP-01-PM3/edit');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('FunctionalLocation/Edit')
                ->has('functional_location')
                ->has('functional_location.data.equipments')
        );
    });

    test('can update functional location', function () {
        $user = User::find("55000154");
        $functionalLocation = FunctionalLocation::find('FP-01-PM3');

        $response = $this
            ->actingAs($user)
            ->patch('/functional-locations/FP-01-PM3', [
                'id' => $functionalLocation->id,
                'description' => 'NEW DESCRIPTION'
            ]);

        $response->assertStatus(302);
        $this->assertNotEquals($functionalLocation->description, $functionalLocation->refresh()->description);
    });

    test('can delete functional location', function () {
        $user = User::find("55000154");
        $functionalLocation = FunctionalLocation::find('FP-01-PM3');

        $response = $this
            ->actingAs($user)
            ->delete("/functional-locations/$functionalLocation->id");

        $this->assertNull($functionalLocation->fresh());
        $response->assertStatus(302);
        $response->assertRedirect(route('functional-locations.index'));
    });
});

describe("user functional location management", function () {

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
            FunctionalLocationSeeder::class
        ]);
    });

    test('functional location page can be rendered', function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('FunctionalLocation/Index')
                ->has('functionalLocations')
        );
    });

    test('create new functional location page should not be rendered', function () {
        $user = User::find("55000153");
        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations/create');

        $response->assertStatus(403);
    });

    test('can show functional location', function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations/FP-01-PM3');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('FunctionalLocation/Show')
                ->has('functional_location')
                ->has('functional_location.data.equipments')
        );
    });

    test('edit functional location page should not be rendered', function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get('/functional-locations/FP-01-PM3/edit');

        $response->assertStatus(403);
    });

    test('should rejected to update functional location', function () {
        $user = User::find("55000153");
        $functionalLocation = FunctionalLocation::find('FP-01-PM3');

        $response = $this
            ->actingAs($user)
            ->patch('/functional-locations/FP-01-PM3', [
                'id' => $functionalLocation->id,
                'description' => 'NEW DESCRIPTION'
            ]);

        $response->assertStatus(403);
    });

    test('should rejected to delete functional location', function () {
        $user = User::find("55000153");
        $functionalLocation = FunctionalLocation::find('FP-01-PM3');

        $response = $this
            ->actingAs($user)
            ->delete("/functional-locations/$functionalLocation->id");

        $this->assertNotNull($functionalLocation->fresh());
        $response->assertStatus(403);
    });
});
