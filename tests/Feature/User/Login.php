<?php


it('should can do login', function () {
    $response = $this->get("/users");

    $response
        ->assertRedirect("/login");
});
