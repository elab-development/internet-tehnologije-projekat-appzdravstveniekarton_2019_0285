<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DijagnozaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::prefix('v1')->group(function () {

    // Rute za autentifikaciju
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // Rute koje zahtevaju autentifikaciju
    Route::middleware('auth:sanctum')->group(function () {

        // Dijagnoza rute (CRUD operacije)
        Route::get('dijagnozas', [DijagnozaController::class, 'index']);
        Route::get('dijagnozas/{id}', [DijagnozaController::class, 'show']);
        Route::post('dijagnozas', [DijagnozaController::class, 'store']);
        Route::put('dijagnozas/{id}', [DijagnozaController::class, 'update']);
        Route::delete('dijagnozas/{id}', [DijagnozaController::class, 'destroy']);

        // Ruta za prikazivanje dijagnoza korisnika
        Route::get('users/{user_id}/dijagnozas', [UserController::class, 'showUserDijagnoze']);

        // Ruta za odjavu korisnika
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

// Ruta za dobijanje trenutnog autentifikovanog korisnika
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
