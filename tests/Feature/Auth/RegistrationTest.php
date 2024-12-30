<?php

describe("user registration", function () {

    test('registration screen can be rendered', function () {
        $response = $this->get('/register');

        $response->assertStatus(200);
    });

    test('new users can register', function () {
        $response = $this->post('/register', [
            'id' => '55000123',
            'first_name' => 'Harvey',
            'last_name' => 'Moeis',
            'email' => 'harvey_moeis@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    });
});
