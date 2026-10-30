<?php

namespace App\Http\Controllers;

use App\Models\Book;

class HomeController extends Controller
{
    public function index()
    {
        $books = Book::orderBy('id', 'desc')->take(4)->get();

        return view('pages.home', compact('books'));
    }
}