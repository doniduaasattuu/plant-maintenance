<?php

use App\Models\Equipment;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe("admin equipment management", function () {

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
        ]);
    });

    test("equipment page can be rendered", function () {
        $admin = User::find("55000154");

        $response = $this
            ->actingAs($admin)
            ->get(route("equipments.index"));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Equipment/Index')
                ->has('equipments')
                ->has('classifications')
                ->has('equipment_status')
                ->has('equipments.data', 10)
                ->has('equipment_status.data', 3)
        );
    });

    test("create new equipment page can be rendered", function () {
        $admin = User::find("55000154");

        $response = $this
            ->actingAs($admin)
            ->get(route("equipments.create"));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Equipment/Create')
                ->has('classifications')
                ->has('equipment_status')
                ->has('equipment_status.data', 3)
        );
    });

    test("can show equipment detail", function () {
        $admin = User::find("55000154");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($admin)
            ->get(route("equipments.show", $equipment->id));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Equipment/Show')
                ->has('equipment')
                ->has('links')
        );
    });

    test("edit equipment page can be rendered", function () {
        $admin = User::find("55000154");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($admin)
            ->get(route("equipments.edit", $equipment->id));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Equipment/Edit')
                ->has('equipment')
                ->has('classifications')
                ->has('equipment_status')
                ->has('links')
        );
    });

    test("can update equipment", function () {
        $admin = User::find("55000154");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($admin)
            ->patch(route("equipments.update", $equipment->id), [
                'id' => $equipment->id,
                'functional_location_id' => $equipment->functional_location_id,
                'sort_field' => $equipment->sort_field,
                'classification_id' => $equipment->classification_id,
                'equipment_status_id' => $equipment->equipment_status_id,
                'description' => 'Updated description',
            ]);

        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();
    });

    test("can delete equipment", function () {
        $admin = User::find("55000154");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($admin)
            ->delete(route("equipments.destroy", $equipment->id));

        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route("equipments.index"));
    });
});

describe("user equipment management", function () {

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
        ]);
    });

    test("equipment page can be rendered", function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get(route("equipments.index"));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Equipment/Index')
                ->has('equipments')
                ->has('classifications')
                ->has('equipment_status')
                ->has('equipments.data', 10)
                ->has('equipment_status.data', 3)
        );
    });

    test("create new equipment page should not be rendered", function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get(route("equipments.create"));

        $response->assertStatus(403);
    });

    test("can show equipment detail", function () {
        $user = User::find("55000153");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($user)
            ->get(route("equipments.show", $equipment->id));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Equipment/Show')
                ->has('equipment')
                ->has('links')
        );
    });

    test("edit equipment page should not be rendered", function () {
        $user = User::find("55000153");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($user)
            ->get(route("equipments.edit", $equipment->id));

        $response->assertStatus(403);
    });

    test("should rejected to update equipment", function () {
        $user = User::find("55000153");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($user)
            ->patch(route("equipments.update", $equipment->id), [
                'id' => $equipment->id,
                'functional_location_id' => $equipment->functional_location_id,
                'sort_field' => $equipment->sort_field,
                'classification_id' => $equipment->classification_id,
                'equipment_status_id' => $equipment->equipment_status_id,
                'description' => 'Updated description',
            ]);

        $response->assertStatus(403);
        $this->assertTrue($equipment->isClean());
    });

    test("should rejected to delete equipment", function () {
        $user = User::find("55000153");
        $equipment = Equipment::find("EMO000123");

        $response = $this
            ->actingAs($user)
            ->delete(route("equipments.destroy", $equipment->id));

        $this->assertNotNull($equipment->fresh());
        $response->assertStatus(403);
    });
});
