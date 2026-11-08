import { useState } from 'react';
import api from './connect';
import { navigate } from './navigate';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const response = await api.post('/login', { email, password });
            const { token, user } = response.data.data;

            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_user', JSON.stringify(user));
            window.dispatchEvent(new Event('app:auth-changed'));
            navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                    'Email atau password salah.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-section">
            <div className="auth-card">
                <div className="text-center mb-4">
                    <h2>Selamat Datang</h2>
                    <p>Masuk untuk melanjutkan ke Booksales</p>
                </div>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="form-control"
                            type="email"
                            placeholder="Masukkan email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="form-control"
                            type="password"
                            placeholder="Masukkan password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit" disabled={submitting}>
                        {submitting ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className="text-center mt-4 mb-0">
                    Belum punya akun? <a href="/register">Daftar</a>
                </p>
            </div>
        </div>
    );
}
