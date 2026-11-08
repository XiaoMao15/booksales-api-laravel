import { useState } from 'react';
import api from './connect';
import FormField from './FormField';
import { validateRegister } from './validators';
import { navigate } from './navigate';

const INITIAL_VALUES = {
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
};

export default function RegisterForm() {
    const [values, setValues] = useState(INITIAL_VALUES);
    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [serverErrors, setServerErrors] = useState({});
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    // Error dihitung ulang setiap render, jadi tidak perlu state terpisah.
    const clientErrors = validateRegister(values);

    // Error baru ditampilkan setelah field disentuh atau form disubmit.
    const getError = (name) => {
        if (!touched[name] && !submitted) {
            return undefined;
        }

        return clientErrors[name] || serverErrors[name];
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((current) => ({ ...current, [name]: value }));
        setServerErrors((current) => ({ ...current, [name]: undefined }));
    };

    const handleBlur = (event) => {
        const { name } = event.target;

        setTouched((current) => ({ ...current, [name]: true }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitted(true);
        setStatus({ type: '', message: '' });

        if (Object.keys(clientErrors).length > 0) {
            return;
        }

        setSubmitting(true);

        try {
            await api.post('/register', {
                ...values,
                name: values.name.trim(),
                email: values.email.trim(),
                username: values.username.trim(),
            });

            setValues(INITIAL_VALUES);
            setTouched({});
            setSubmitted(false);
            setStatus({
                type: 'success',
                message: 'Registrasi berhasil! Mengarahkan ke halaman login...',
            });

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            const response = err.response?.data;

            if (err.response?.status === 422 && response?.data) {
                // Laravel mengirim { field: ['pesan', ...] }, ambil pesan pertama.
                const fieldErrors = Object.fromEntries(
                    Object.entries(response.data).map(([field, messages]) => [
                        field,
                        messages[0],
                    ])
                );

                setServerErrors(fieldErrors);
                setStatus({
                    type: 'danger',
                    message: 'Periksa kembali data yang kamu isi.',
                });
            } else {
                setStatus({
                    type: 'danger',
                    message: response?.message || 'Terjadi kesalahan, coba lagi nanti.',
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const fieldProps = (name) => ({
        id: name,
        value: values[name],
        error: getError(name),
        onChange: handleChange,
        onBlur: handleBlur,
    });

    return (
        <div className="auth-section">
            <div className="auth-card">
                <div className="text-center mb-4">
                    <h2>Buat Akun</h2>
                    <p>Gabung dengan Booksales dan jelajahi koleksi buku kami</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {status.message && (
                        <div className={`alert alert-${status.type}`} role="alert">
                            {status.message}
                        </div>
                    )}

                    <FormField
                        label="Nama Lengkap"
                        placeholder="Masukkan nama lengkap"
                        autoComplete="name"
                        {...fieldProps('name')}
                    />

                    <FormField
                        label="Email"
                        type="email"
                        placeholder="Masukkan email"
                        autoComplete="email"
                        {...fieldProps('email')}
                    />

                    <FormField
                        label="Username"
                        placeholder="Contoh: budi_01"
                        autoComplete="username"
                        {...fieldProps('username')}
                    />

                    <FormField
                        label="Password"
                        type="password"
                        placeholder="Minimal 8 karakter"
                        autoComplete="new-password"
                        {...fieldProps('password')}
                    />

                    <FormField
                        label="Konfirmasi Password"
                        type="password"
                        placeholder="Ulangi password"
                        autoComplete="new-password"
                        {...fieldProps('password_confirmation')}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={submitting}
                    >
                        {submitting ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>

                <p className="text-center mt-4 mb-0">
                    Sudah punya akun? <a href="/login">Masuk</a>
                </p>
            </div>
        </div>
    );
}
