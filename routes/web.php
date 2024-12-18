<?php

use App\Http\Controllers\AcCheckController;
use App\Http\Controllers\AparCheckController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EquipmentMaterialController;
use App\Http\Controllers\EquipmentMovementController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\FindingController;
use App\Http\Controllers\FunctionalLocationController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MaterialEquipmentController;
use App\Http\Controllers\MotorCheckController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\TrendController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Resource_;

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
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class);
    Route::patch('/users/reset/{user}', [UserController::class, 'reset'])->name('users.reset');

    Route::resources([
        'roles' => RoleController::class,
        'functional-locations' => FunctionalLocationController::class,
        'equipments' => EquipmentController::class,
        'equipment-movements' => EquipmentMovementController::class,
        'documents' => DocumentController::class,
        'findings' => FindingController::class,

        // MATERIALS
        'material-equipment' => MaterialEquipmentController::class,
        'materials' => MaterialController::class,

        // EQUIPMENT CHECKING
        'motor-check' => MotorCheckController::class,
        'ac-check' => AcCheckController::class,
        'apar-check' => AparCheckController::class,

        // TREND
        'trend' => TrendController::class,
    ]);

    // Route::get('api/materials', [MaterialController::class, 'search'])->name('api.materials');
    Route::post('equipment-movements/filter', [EquipmentMovementController::class, 'filter'])->name('equipment-movements.filter');

    Route::get('export-users', [ExportController::class, 'exportUsers'])->name('export.users');
    Route::get('export-motor-checks/{equipment_id}', [ExportController::class, 'exportMotorChecks'])->name('export.motor-checks');
    Route::get('export-ac-checks/{equipment_id}', [ExportController::class, 'exportAcChecks'])->name('export.ac-checks');
    Route::get('export-apar-checks/{equipment_id}', [ExportController::class, 'exportAparChecks'])->name('export.apar-checks');

    Route::resource('scanner', ScannerController::class)->only(['index']);
});

require __DIR__ . '/auth.php';
