@extends('layouts.app')

@section('title', $author->name . ' - Booksales')

@section('content')

<section class="container py-5">
    <a href="/authors" class="text-decoration-none text-primary">
        ← Back to Authors
    </a>

    <div class="row align-items-center g-5 mt-3">
        <div class="col-md-4 text-center">
            <div class="author-detail-photo">
                @if ($author->foto)
                    <img src="{{ asset($author->foto) }}" alt="{{ $author->name }}">
                @else
                    <div class="author-placeholder">
                        {{ strtoupper(substr($author->name, 0, 1)) }}
                    </div>
                @endif
            </div>
        </div>

        <div class="col-md-8">
            <span class="section-label">AUTHOR PROFILE</span>
            <h1 class="detail-title">{{ $author->name }}</h1>

            <div class="detail-description">
                <h5>Biography</h5>
                <p>{{ $author->bio ?: 'No biography available.' }}</p>
            </div>

            <a href="/authors" class="btn btn-primary mt-3">
                Back to Authors
            </a>
        </div>
    </div>
</section>

@endsection
