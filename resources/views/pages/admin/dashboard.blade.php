
@extends('layouts.app')

@section('content')
<div class="container py-5 admin-dashboard">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold" style="color: var(--primary-dark);">
                Admin Dashboard
            </h2>
            <p class="text-muted mb-0">Manage your Booksales platform</p>
        </div>
        <span class="badge bg-primary p-2">Administrator</span>
    </div>

    <div class="row g-4 mb-5">
        <div class="col-md-4">
            <div class="card border-0 shadow-sm p-3">
                <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-book fs-1 text-primary"></i>
                    <div>
                        <p class="text-muted mb-1">Total Books</p>
                        <h3 class="fw-bold mb-0">{{ $totalBooks }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card border-0 shadow-sm p-3">
                <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-people fs-1 text-primary"></i>
                    <div>
                        <p class="text-muted mb-1">Total Authors</p>
                        <h3 class="fw-bold mb-0">{{ $totalAuthors }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card border-0 shadow-sm p-3">
                <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-tags fs-1 text-primary"></i>
                    <div>
                        <p class="text-muted mb-1">Total Genres</p>
                        <h3 class="fw-bold mb-0">{{ $totalGenres }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <h4 class="fw-bold mb-3">Management</h4>

    <div class="row g-3">
        <div class="col-md-4">
            <a href="/books" class="btn btn-outline-primary w-100 p-3">
                <i class="bi bi-book me-2"></i> Manage Books
            </a>
        </div>

        <div class="col-md-4">
            <a href="/authors" class="btn btn-outline-primary w-100 p-3">
                <i class="bi bi-people me-2"></i> Manage Authors
            </a>
        </div>

        <div class="col-md-4">
            <a href="/genres" class="btn btn-outline-primary w-100 p-3">
                <i class="bi bi-tags me-2"></i> Manage Genres
            </a>
        </div>
    </div>
</div>
@endsection
