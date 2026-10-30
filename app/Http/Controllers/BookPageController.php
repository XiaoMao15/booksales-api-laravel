<?php

namespace App\Http\Controllers;

use App\Models\Book;

class BookPageController extends Controller
{
    public function index()
    {
        $books = Book::all();

        return view('pages.books.index', compact('books'));
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);

        return view('pages.books.show', compact('book'));
    }
}