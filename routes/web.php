<?php

use App\Http\Controllers\FunctionalLocationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class);
    Route::patch('/users/reset/{user}', [UserController::class, 'reset'])->name('users.reset');
    // Route::put('users/reset', [UserController::class, 'reset'])->name('users.reset');

    Route::resource('roles', RoleController::class);

    Route::resource('functional-locations', FunctionalLocationController::class);
    // Route::get('functional-locations', [FunctionalLocationController::class, 'index']);
});

require __DIR__ . '/auth.php';
