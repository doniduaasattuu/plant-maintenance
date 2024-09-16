<?php

use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EquipmentMovementController;
use App\Http\Controllers\FunctionalLocationController;
use App\Http\Controllers\MotorCheckController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\TrendController;
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

    Route::resources([
        'roles' => RoleController::class,
        'functional-locations' => FunctionalLocationController::class,
        'equipments' => EquipmentController::class,
        'equipment-movements' => EquipmentMovementController::class,
        // EQUIPMENT CHECKING
        'motor-check' => MotorCheckController::class,
        'trend' => TrendController::class,
    ]);

    Route::post('equipment-movements/filter', [EquipmentMovementController::class, 'filter'])->name('equipment-movements.filter');

    Route::resource('scanner', ScannerController::class)->only(['index']);
});

require __DIR__ . '/auth.php';
