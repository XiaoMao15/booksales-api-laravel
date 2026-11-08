<?php

it('serves the React application for frontend routes', function () {
    foreach ([
        '/',
        '/books',
        '/books/1',
        '/authors',
        '/authors/1',
        '/genres',
        '/genres/1',
        '/login',
        '/register',
        '/admin/dashboard',
    ] as $path) {
        $response = $this->get($path);

        $response->assertOk()
            ->assertSee('<div id="app"></div>', false);
    }
});

it('keeps authentication requests on the API', function () {
    $response = $this->postJson('/api/login', []);

    $response->assertUnprocessable()
        ->assertJsonPath('message', 'Validation error');
});

it('returns a placeholder for book images that are not uploaded', function () {
    $response = $this->get('/media/tlon.jpg');

    $response->assertOk()
        ->assertHeader('content-type', 'image/svg+xml');
});
