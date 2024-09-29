<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request?->user()?->load('roles.permissions');

        $permissions = [];

        if ($user) {
            foreach ($user->roles as $role) {
                foreach ($role->permissions as $singlePermission) {
                    $permissions[] = $singlePermission->title;
                }
            }

            $permissions = collect($permissions)->unique()->map(function ($permission) {
                return [$permission => true];
            })->collapse();
        }

        $message = collect(Arr::only(session()->all(), ['success', 'error']))
            ->mapWithKeys(function ($body, $type) {
                return [
                    'type' => $type,
                    'body' => $body,
                ];
            });

        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'upload_max_filesize' => config('app.upload_max_filesize'),
            'themes' => config('app.themes', []),
            'can' => $permissions,
            'message' => $message,
        ];
    }
}
