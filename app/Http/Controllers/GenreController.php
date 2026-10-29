<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::all();

        return response()->json([
            'success' => true,
            'message' => 'Data genre berhasil diambil',
            'data' => $genres
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $genre = Genre::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data genre berhasil ditambahkan',
            'data' => $genre
        ], 201);
    }
    public function show($id)
{
    $genre = Genre::find($id);

    if (!$genre) {
        return response()->json([
            'success' => false,
            'message' => 'Data genre tidak ditemukan'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Data genre berhasil diambil',
        'data' => $genre
    ], 200);
}

public function update(Request $request, $id)
{
    $genre = Genre::find($id);

    if (!$genre) {
        return response()->json([
            'success' => false,
            'message' => 'Data genre tidak ditemukan'
        ], 404);
    }

    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|required|string',
    ]);

    $genre->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Data genre berhasil diperbarui',
        'data' => $genre
    ], 200);
}

public function destroy($id)
{
    $genre = Genre::find($id);

    if (!$genre) {
        return response()->json([
            'success' => false,
            'message' => 'Data genre tidak ditemukan'
        ], 404);
    }

    $genre->delete();

    return response()->json([
        'success' => true,
        'message' => 'Data genre berhasil dihapus'
    ], 200);
}
}
