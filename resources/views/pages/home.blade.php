@extends('layouts.app')

@section('title', 'Home - Booksales')

@section('content')

<section class="hero-section">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <span class="hero-label">DIGITAL LIBRARY</span>

                <h1 class="hero-title">
                    Discover Your Next
                    <span>Favorite Book.</span>
                </h1>

                <p class="hero-description">
                    Explore thousands of books, discover new knowledge,
                    and find your next reading adventure with Booksales.
                </p>

                <div class="d-flex gap-3 flex-wrap">
                    <a href="/books" class="btn btn-primary btn-lg">
                        Explore Books
                    </a>
                    <a href="/authors" class="btn btn-outline-primary btn-lg">
                        Discover Authors
                    </a>
                </div>
            </div>

            <div class="col-lg-6 text-center mt-5 mt-lg-0">
                <div class="hero-image">
                    <div class="hero-decoration"></div>
                    <img
                        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800"
                        alt="Library"
                        class="img-fluid"
                    >
                </div>
            </div>
        </div>
    </div>
</section>

<section class="container py-5">
    <div class="section-heading">
        <div>
            <span class="section-label">EXPLORE</span>
            <h2>Browse Categories</h2>
            <p>Find books based on your interests.</p>
        </div>
        <a href="/genres" class="text-primary text-decoration-none">
            View All
        </a>
    </div>

    <div class="row g-4 mt-2">
        @foreach ([
            ['name' => 'Technology', 'icon' => 'bi-laptop'],
            ['name' => 'Science', 'icon' => 'bi-atom'],
            ['name' => 'Business', 'icon' => 'bi-briefcase'],
            ['name' => 'Literature', 'icon' => 'bi-book'],
        ] as $category)
            <div class="col-6 col-lg-3">
                <a href="/genres" class="category-card">
                    <div class="category-icon">
                        <i class="bi {{ $category['icon'] }}"></i>
                    </div>
                    <h5>{{ $category['name'] }}</h5>
                    <span>Explore Books</span>
                </a>
            </div>
        @endforeach
    </div>
</section>

<section class="featured-section py-5">
    <div class="container">
        <div class="section-heading">
            <div>
                <span class="section-label">OUR COLLECTION</span>
                <h2>Featured Books</h2>
                <p>Discover books from our collection.</p>
            </div>
            <a href="/books" class="text-primary text-decoration-none">
                View All Books
            </a>
        </div>

        <div class="row g-4 mt-2">
            @forelse ($books as $book)
                <div class="col-6 col-lg-3">
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
                            <p>{{ $book->price }}</p>
                            <a href="/books" class="btn btn-sm btn-outline-primary">
                                View Book
                            </a>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-12 text-center py-4">
                    <p>No books available yet.</p>
                </div>
            @endforelse
        </div>
    </div>
</section>

@endsection
