
@extends('layouts.app')

@section('title', 'Genres - Booksales')

@section('content')

<section class="catalog-header">
    <div class="container">
        <span class="section-label">BOOK CATEGORIES</span>
        <h1>Explore Book Genres</h1>
        <p>Discover books across different categories and interests.</p>
    </div>
</section>

<section class="container py-5">
    <div class="catalog-toolbar">
        <div>
            <h4>Our Genres</h4>
            <p>Find your next reading interest.</p>
        </div>
        <span class="book-count">{{ $genres->count() }} Genres</span>
    </div>

    <div class="row g-4">
        @forelse ($genres as $genre)
            <div class="col-6 col-md-4 col-lg-3">
                <a href="/genres/{{ $genre->id }}" class="genre-card">
                    <div class="genre-icon">
                        <i class="bi bi-book-half"></i>
                    </div>

                    <h5>{{ $genre->name }}</h5>
                    <p>{{ $genre->description ?: 'Explore this category.' }}</p>

                    <span class="genre-link">Explore Genre →</span>
                </a>
            </div>
        @empty
            <div class="col-12 text-center py-5">
                <h5>No Genres Available</h5>
                <p class="text-muted">There are no genres in the collection yet.</p>
            </div>
        @endforelse
    </div>
</section>

@endsection

