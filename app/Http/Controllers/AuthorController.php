<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::all();

        return response()->json([
            'success' => true,
            'message' => 'Data penulis berhasil diambil',
            'data' => $authors
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'foto' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        $author = Author::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data penulis berhasil ditambahkan',
            'data' => $author
        ], 201);
    }
}
