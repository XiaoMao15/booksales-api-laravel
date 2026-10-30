@extends('layouts.app')

@section('title', 'Authors - Booksales')

@section('content')

<section class="catalog-header">
    <div class="container">
        <span class="section-label">OUR AUTHORS</span>
        <h1>Meet the Authors</h1>
        <p>Discover the writers behind your favorite books.</p>
    </div>
</section>

<section class="container py-5">
    <div class="catalog-toolbar">
        <div>
            <h4>Our Authors</h4>
            <p>Explore our collection of writers.</p>
        </div>
        <span class="book-count">{{ $authors->count() }} Authors</span>
    </div>

    <div class="row g-4">
        @forelse ($authors as $author)
            <div class="col-6 col-md-4 col-lg-3">
                <div class="author-card">
                    <div class="author-photo">
                        @if ($author->foto)
                            <img src="{{ asset($author->foto) }}" alt="{{ $author->name }}">
                        @else
                            <div class="author-placeholder">
                                {{ strtoupper(substr($author->name, 0, 1)) }}
                            </div>
                        @endif
                    </div>

                    <div class="author-info">
                        <h5>{{ $author->name }}</h5>
                        <a href="/authors/{{ $author->id }}"
                            class="btn btn-sm btn-outline-primary w-100">
                            View Profile
                        </a>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12 text-center py-5">
                <h5>No Authors Available</h5>
                <p class="text-muted">There are no authors in the collection yet.</p>
            </div>
        @endforelse
    </div>
</section>

@endsection
