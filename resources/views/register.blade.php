
@extends('layouts.app')

@section('title', 'Register - Booksales')

@section('content')
<div class="auth-section">
    <div class="auth-card">
        <div class="text-center mb-4">
            <h2>Buat Akun</h2>
            <p>Gabung dengan Booksales dan jelajahi koleksi buku kami</p>
        </div>

        <div id="register-root"></div>

        <p class="text-center mt-4 mb-0">
            Sudah punya akun?
            <a href="/login">Masuk</a>
        </p>
    </div>
</div>
@endsection

@push('scripts')
    @vite('resources/js/register.jsx')
@endpush
