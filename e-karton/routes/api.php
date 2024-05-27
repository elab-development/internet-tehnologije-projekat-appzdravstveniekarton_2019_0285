<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DijagnozaController;
use App\Http\Controllers\UserController;



Route::prefix('v1')->group(function () {
    Route::get('dijagnozas', [DijagnozaController::class, 'index']);
    Route::get('dijagnozas/{id}', [DijagnozaController::class, 'show']);
    Route::post('dijagnozas', [DijagnozaController::class, 'store']);
    Route::put('dijagnozas/{id}', [DijagnozaController::class, 'update']);
    Route::delete('dijagnozas/{id}', [DijagnozaController::class, 'destroy']);

    Route::get('users/{user_id}/dijagnozas', [UserController::class, 'showUserDijagnoze']);
});







Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
