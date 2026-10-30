
@extends('layouts.app')

@section('content')
<div class="auth-section">
    <div class="auth-card">
        <div class="text-center mb-4">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to Booksales</p>
        </div>

        <form>
            <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" placeholder="Enter your email">
            </div>

            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" placeholder="Enter your password">
            </div>

            <button type="submit" class="btn btn-primary w-100">
                Sign In
            </button>
        </form>

        <p class="text-center mt-4 mb-0">
            Don't have an account?
            <a href="/register">Create Account</a>
        </p>
    </div>
</div>
@endsection
