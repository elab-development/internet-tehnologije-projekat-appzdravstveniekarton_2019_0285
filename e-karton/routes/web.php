<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LekarController;
use App\Http\Controllers\DijagnozaController;



Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);


Route::get('/lekars', [LekarController::class, 'index']);
Route::get('/lekars/{id}', [LekarController::class, 'show']);
Route::get('/lekars/obrisi/{id}', [LekarController::class, 'destroy']);



Route::get('lekars/create', [LekarController::class, 'create'])->name('lekars.create');
Route::post('lekars', [LekarController::class, 'store'])->name('lekars.store');
