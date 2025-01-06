<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\AuthGates::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response) {
            $statusCode = $response->getStatusCode();
            $title = config("http_statuses.$statusCode.title", "Error Occured");
            $description = config("http_statuses.$statusCode.description", "We are working to fix this issue. Please try again later.");

            if (config('app.custom_error_pages_enabled') && !in_array($statusCode, [200, 302, 303])) {
                return Inertia::render("Error", [
                    'status' => $statusCode,
                    'title' => $title,
                    'description' => $description
                ])->toResponse(request())->setStatusCode($statusCode == 204 ? 200 : $statusCode);
            }

            return $response;
        });
    })->create();
