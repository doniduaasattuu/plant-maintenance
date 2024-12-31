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

describe("profile", function () {

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

    test('profile page is displayed', function () {
        $user = User::find("55000154");

        $this->assertNotNull($user);
        $this->assertEquals($user->first_name, "Doni");

        $response = $this
            ->actingAs($user)
            ->get('/profile');

        $response->assertOk();
    });

    test('profile information can be updated', function () {
        $user = User::find("55000153");

        $this->assertNotNull($user);

        $response = $this
            ->actingAs($user)
            ->post('/profile', [
                'first_name' => 'Olaf',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors();

        $user->refresh();

        $this->assertSame('Olaf', $user->first_name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    });

    test('email verification status is unchanged when the email address is unchanged', function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => $user->email,
            ]);

        $response
            ->assertSessionHasNoErrors();

        $this->assertNotNull($user->refresh()->email_verified_at);
    });

    test('user can delete their account', function () {
        $user = User::find("55000154");

        $response = $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors();

        $this->assertGuest();
        $this->assertNull($user->fresh());
    });

    test('correct password must be provided to delete account', function () {
        $user = User::find("55000154");

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/profile');

        $this->assertNotNull($user->fresh());
    });

    test('should can delete account if user is admin', function () {
        $user = User::find("55000154");

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors('password')
            ->assertRedirect('/');

        $this->assertNull($user->fresh());
    });

    test('should reject delete account if user is not admin', function () {
        $user = User::find("55000153");

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertStatus(403);

        $this->assertNotNull($user->fresh());
    });
});
