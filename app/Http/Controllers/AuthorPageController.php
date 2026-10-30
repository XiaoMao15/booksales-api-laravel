<?php

namespace App\Http\Controllers;

use App\Models\Author;

class AuthorPageController extends Controller
{
    public function index()
    {
        $authors = Author::all();

        return view('pages.authors.index', compact('authors'));
    }

    public function show($id)
    {
        $author = Author::findOrFail($id);

        return view('pages.authors.show', compact('author'));
    }
}