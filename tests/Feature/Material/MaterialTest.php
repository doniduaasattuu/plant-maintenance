<?php

use App\Models\Material;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe("admin material management", function () {

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
            UnitOfMeasurementSeeder::class,
            MaterialSeeder::class,
            MaterialEquipmentTableSeeder::class,
        ]);
    });

    test("material page can be rendered", function () {
        $admin = User::find("55000154");

        $response = $this
            ->actingAs($admin)
            ->get(route("materials.index"));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Material/Index')
                ->has('materials')
                ->has('unitOfMeasurements')
        );
    });

    test("create new material page can be rendered", function () {
        $admin = User::find("55000154");

        $response = $this
            ->actingAs($admin)
            ->get(route("materials.create"));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Material/Create')
                ->has('unitOfMeasurements')
        );
    });

    test("can show material detail", function () {
        $admin = User::find("55000154");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($admin)
            ->get(route("materials.show", $material->id));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Material/Show')
                ->has('material')
        );
    });

    test("edit material page can be rendered", function () {
        $admin = User::find("55000154");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($admin)
            ->get(route("materials.edit", $material->id));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Material/Edit')
                ->has('material')
                ->has('unitOfMeasurements')
        );
    });

    test("can update material", function () {
        $admin = User::find("55000154");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($admin)
            ->patch(route("materials.update", $material->id), [
                'id' => $material->id,
                'title' => "New updated material",
                'unit_of_measurement_id' => $material->unit_of_measurement_id,
                'price' => $material->price,
            ]);

        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();
        $this->assertNotEquals($material->title, $material->fresh()->title);
    });

    test("can delete material", function () {
        $admin = User::find("55000154");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($admin)
            ->delete(route("materials.destroy", $material->id));

        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route("materials.index"));
    });
});

describe("user material management", function () {

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
            UnitOfMeasurementSeeder::class,
            MaterialSeeder::class,
            MaterialEquipmentTableSeeder::class,
        ]);
    });

    test("material page can be rendered", function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get(route("materials.index"));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Material/Index')
                ->has('materials')
                ->has('unitOfMeasurements')
        );
    });

    test("create new material page should not be rendered", function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->get(route("materials.create"));

        $response->assertStatus(403);
    });

    test("can show material detail", function () {
        $user = User::find("55000153");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($user)
            ->get(route("materials.show", $material->id));

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Material/Show')
                ->has('material')
        );
    });

    test("edit material page should not be rendered", function () {
        $user = User::find("55000153");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($user)
            ->get(route("materials.edit", $material->id));

        $response->assertStatus(403);
    });

    test("should rejected to update material", function () {
        $user = User::find("55000153");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($user)
            ->patch(route("materials.update", $material->id), [
                'id' => $material->id,
                'title' => "New updated material",
                'unit_of_measurement_id' => $material->unit_of_measurement_id,
                'price' => $material->price,
            ]);

        $response->assertStatus(403);
        $this->assertTrue($material->isClean());
    });

    test("should rejected to delete material", function () {
        $user = User::find("55000153");
        $material = Material::find("10010123");

        $response = $this
            ->actingAs($user)
            ->delete(route("materials.destroy", $material->id));

        $this->assertNotNull($material->fresh());
        $response->assertStatus(403);
    });
});
