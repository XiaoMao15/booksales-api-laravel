<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;

// Books - publik
Route::get('/books', [BookController::class, 'index']);

// Author - akses publik untuk membaca
Route::apiResource('authors', AuthorController::class)
    ->only(['index', 'show']);

// Genre - akses publik untuk membaca
Route::apiResource('genres', GenreController::class)
    ->only(['index', 'show']);

// Author dan Genre - khusus Admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::apiResource('authors', AuthorController::class)
        ->except(['index', 'show']);

    Route::apiResource('genres', GenreController::class)
        ->except(['index', 'show']);

});