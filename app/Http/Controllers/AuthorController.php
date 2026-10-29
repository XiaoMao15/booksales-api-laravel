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
    public function show($id)
{
    $author = Author::find($id);

    if (!$author) {
        return response()->json([
            'success' => false,
            'message' => 'Data penulis tidak ditemukan'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Data penulis berhasil diambil',
        'data' => $author
    ], 200);
}

public function update(Request $request, $id)
{
    $author = Author::find($id);

    if (!$author) {
        return response()->json([
            'success' => false,
            'message' => 'Data penulis tidak ditemukan'
        ], 404);
    }

    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'foto' => 'sometimes|nullable|string',
        'bio' => 'sometimes|nullable|string',
    ]);

    $author->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Data penulis berhasil diperbarui',
        'data' => $author
    ], 200);
}

public function destroy($id)
{
    $author = Author::find($id);

    if (!$author) {
        return response()->json([
            'success' => false,
            'message' => 'Data penulis tidak ditemukan'
        ], 404);
    }

    $author->delete();

    return response()->json([
        'success' => true,
        'message' => 'Data penulis berhasil dihapus'
    ], 200);
}
}
