<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use App\Models\Genre;

class AdminPageController extends Controller
{
    public function index()
    {
        $totalBooks = Book::count();
        $totalAuthors = Author::count();
        $totalGenres = Genre::count();

        return view('pages.admin.dashboard', compact(
            'totalBooks',
            'totalAuthors',
            'totalGenres'
        ));
    }
}