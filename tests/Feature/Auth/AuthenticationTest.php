<?php

use App\Models\User;
use Database\Seeders\DepartmentSeeder;
use Database\Seeders\DivisionSeeder;
use Database\Seeders\PositionSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\WorkCenterSeeder;

describe("login authentication", function () {

    beforeEach(function () {
        $this->seed([
            DivisionSeeder::class,
            DepartmentSeeder::class,
            PositionSeeder::class,
            WorkCenterSeeder::class,
            UserSeeder::class,
        ]);
    });

    test('login screen can be rendered', function () {
        $response = $this->get('/login');

        $response->assertStatus(200);
    });

    test('users can authenticate using the login screen', function () {
        $user = User::find("55000154");

        $response = $this->post('/login', [
            'id' => $user->id,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    });

    test('users can not authenticate with invalid password', function () {
        $user = User::find("55000154");


        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    });

    test('users can logout', function () {
        $user = User::find("55000154");


        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    });
});
