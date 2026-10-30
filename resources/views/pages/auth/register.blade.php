
@extends('layouts.app')

@section('content')
<div class="auth-section">
    <div class="auth-card">
        <div class="text-center mb-4">
            <h2>Create Account</h2>
            <p>Join Booksales and explore our book collection</p>
        </div>

        <form>
            <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" placeholder="Enter your name">
            </div>

            <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" placeholder="Enter your email">
            </div>

            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" placeholder="Create a password">
            </div>

            <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input type="password" class="form-control" placeholder="Confirm your password">
            </div>

            <button type="submit" class="btn btn-primary w-100">
                Create Account
            </button>
        </form>

        <p class="text-center mt-4 mb-0">
            Already have an account?
            <a href="/login">Sign In</a>
        </p>
    </div>
</div>
@endsection
