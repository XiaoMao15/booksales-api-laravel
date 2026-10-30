<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BookPageController;
use App\Http\Controllers\AuthorPageController;
use App\Http\Controllers\GenrePageController;
use App\Http\Controllers\AuthPageController;
use App\Http\Controllers\AdminPageController;

Route::get('/', [HomeController::class, 'index']);

Route::get('/books', [BookPageController::class, 'index']);
Route::get('/books/{id}', [BookPageController::class, 'show']);

Route::get('/authors', [AuthorPageController::class, 'index']);
Route::get('/authors/{id}', [AuthorPageController::class, 'show']);

Route::get('/genres', [GenrePageController::class, 'index']);
Route::get('/genres/{id}', [GenrePageController::class, 'show']);

Route::get('/login', [AuthPageController::class, 'login']);
Route::get('/register', [AuthPageController::class, 'register']);

Route::get('/admin/dashboard', [AdminPageController::class, 'index']);