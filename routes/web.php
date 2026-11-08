<?php

use Illuminate\Support\Facades\Route;

Route::get('/media/{filename}', function (string $filename) {
    $imagePath = storage_path('app/public/'.$filename);

    if (is_file($imagePath)) {
        return response()->file($imagePath);
    }

    return response()->file(public_path('images/image-placeholder.svg'));
})->where('filename', '[A-Za-z0-9_-]+\.(jpg|jpeg|png|webp)');

Route::view('/', 'app');
Route::view('/books/{id?}', 'app')->whereNumber('id');
Route::view('/authors/{id?}', 'app')->whereNumber('id');
Route::view('/genres/{id?}', 'app')->whereNumber('id');
Route::view('/login', 'app');
Route::view('/register', 'app');
Route::view('/admin/dashboard', 'app');
