@extends('layouts.app')

@section('title', 'Book Catalog - Booksales')

@section('content')

<section class="catalog-header">
    <div class="container">
        <span class="section-label">OUR COLLECTION</span>
        <h1>Explore Our Books</h1>
        <p>Discover books and find your next favorite read.</p>
    </div>
</section>

<section class="container py-5">
    <div class="catalog-toolbar">
        <div>
            <h4>Book Catalog</h4>
            <p>Browse our available collection.</p>
        </div>
        <span class="book-count">{{ $books->count() }} Books</span>
    </div>

    <div class="row g-4">
        @forelse ($books as $book)
            <div class="col-6 col-md-4 col-lg-3">
                <div class="book-card">
                    <div class="book-cover">
                        @if ($book->cover_foto)
                            <img
                                src="{{ asset($book->cover_foto) }}"
                                alt="{{ $book->title }}"
                            >
                        @else
                            <span>No Cover</span>
                        @endif
                    </div>

                    <div class="book-info">
                        <h5>{{ $book->title }}</h5>
                        <p>Rp {{ number_format($book->price, 0, ',', '.') }}</p>

                        <a href="/books/{{ $book->id }}"
                            class="btn btn-sm btn-outline-primary w-100">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12 text-center py-5">
                <h5>No Books Available</h5>
                <p class="text-muted">There are no books in the collection yet.</p>
            </div>
        @endforelse
    </div>
</section>

@endsection
