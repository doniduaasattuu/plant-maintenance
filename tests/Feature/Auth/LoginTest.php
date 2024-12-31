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

describe("login test", function () {

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

    it("login screen can be rendered", function () {
        $response = $this->get('/login');

        $response->assertStatus(200);
    });

    it("authentic user should can do login", function () {
        $user = User::find("55000153");

        $response =
            $this
            ->post("/login", [
                'id' => $user->id,
                'password' => "password",
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect("/dashboard");
    });

    it("should reject if password is wrong", function () {
        $user = User::find("55000153");

        $response =
            $this
            ->post("/login", [
                'id' => $user->id,
                'password' => "salah",
            ]);

        $response->assertSessionHasErrors("id");
        $this->assertEquals(session("errors")->first("id"), 'These credentials do not match our records.');
    });

    it("should reject unregistered user", function () {

        $response =
            $this
            ->post("/login", [
                'id' => '55001910',
                'password' => "salah",
            ]);

        $response->assertSessionHasErrors("id");
        $this->assertEquals(session("errors")->first("id"), 'The selected id is invalid.');
    });
});
