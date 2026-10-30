@extends('layouts.app')

@section('title', $book->title . ' - Booksales')

@section('content')

<section class="container py-5">
    <a href="/books" class="text-decoration-none text-primary">
        ← Back to Catalog
    </a>

    <div class="row g-5 mt-3">
        <div class="col-md-4">
            <div class="detail-cover">
                @if ($book->cover_foto)
                    <img src="{{ asset($book->cover_foto) }}" alt="{{ $book->title }}">
                @else
                    <span>No Cover Available</span>
                @endif
            </div>
        </div>

        <div class="col-md-8">
            <span class="section-label">BOOK DETAILS</span>

            <h1 class="detail-title">{{ $book->title }}</h1>

            <h4 class="detail-price">
                Rp {{ number_format($book->price, 0, ',', '.') }}
            </h4>

            <div class="detail-description">
                <h5>Description</h5>
                <p>{{ $book->description ?: 'No description available.' }}</p>
            </div>

            <div class="detail-stock">
                Stock: {{ $book->stock }}
            </div>

            <a href="/books" class="btn btn-primary mt-4">
                Back to Catalog
            </a>
        </div>
    </div>
</section>

@endsection
