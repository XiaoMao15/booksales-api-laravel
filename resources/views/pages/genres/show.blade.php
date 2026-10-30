
@extends('layouts.app')

@section('title', $genre->name . ' - Booksales')

@section('content')

<section class="container py-5">
    <a href="/genres" class="text-decoration-none text-primary">
        ← Back to Genres
    </a>

    <div class="genre-detail mt-4">
        <div class="genre-detail-icon">
            <i class="bi bi-book-half"></i>
        </div>

        <span class="section-label">BOOK CATEGORY</span>

        <h1 class="detail-title">{{ $genre->name }}</h1>

        <div class="detail-description">
            <h5>About This Genre</h5>
            <p>{{ $genre->description ?: 'No description available.' }}</p>
        </div>

        <a href="/genres" class="btn btn-primary mt-3">
            Back to Genres
        </a>
    </div>
</section>

@endsection

