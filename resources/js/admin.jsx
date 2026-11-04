
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import api from './connect';

function Admin() {
    const [activePage, setActivePage] = useState('genres');
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [showForm, setShowForm] = useState(false);

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('auth_user')) || null;
        } catch {
            return null;
        }
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        foto: '',
        bio: '',
    });

    useEffect(() => {
        fetchData();
    }, [activePage]);

    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            const endpoint =
                activePage === 'genres' ? '/genres' : '/authors';

            const response = await api.get(endpoint);

            if (activePage === 'genres') {
                setGenres(response.data.data);
            } else {
                setAuthors(response.data.data);
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 'Gagal mengambil data.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/login', loginData);

            const { token, user: loggedUser } = response.data.data;

            if (loggedUser.role !== 'admin') {
                setError('Akun ini bukan Administrator.');
                return;
            }

            localStorage.setItem('auth_token', token);
            localStorage.setItem(
                'auth_user',
                JSON.stringify(loggedUser)
            );

            setUser(loggedUser);
            setLoginData({
                email: '',
                password: '',
            });

            setSuccess('Login Admin berhasil.');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Login gagal. Periksa email dan password.'
            );
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (err) {
            console.error('Logout request failed:', err);
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');

            setUser(null);
            setShowForm(false);
            setSuccess('');
            setError('');
        }
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        setShowForm(false);
        setError('');
        setSuccess('');

        setFormData({
            name: '',
            description: '',
            foto: '',
            bio: '',
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!user || user.role !== 'admin') {
            setError('Silakan login sebagai Admin terlebih dahulu.');
            return;
        }

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const endpoint =
                activePage === 'genres' ? '/genres' : '/authors';

            const payload =
                activePage === 'genres'
                    ? {
                        name: formData.name,
                        description: formData.description,
                    }
                    : {
                        name: formData.name,
                        foto: formData.foto || null,
                        bio: formData.bio || null,
                    };

            await api.post(endpoint, payload);

            setFormData({
                name: '',
                description: '',
                foto: '',
                bio: '',
            });

            setShowForm(false);
            setSuccess(
                activePage === 'genres'
                    ? 'Genre berhasil ditambahkan.'
                    : 'Author berhasil ditambahkan.'
            );

            await fetchData();
        } catch (err) {
            const responseData = err.response?.data;

            if (responseData?.errors) {
                setError(
                    Object.values(responseData.errors)
                        .flat()
                        .join(' ')
                );
            } else {
                setError(
                    responseData?.message || 'Gagal menambahkan data.'
                );
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4">
                Book Sales Management
            </h2>

            <div className="d-flex justify-content-between align-items-center gap-3 mb-4 flex-wrap">
                {user ? (
                    <>
                        <div>
                            Logged in as <strong>{user.name}</strong>
                            <span className="badge bg-success ms-2">
                                Admin
                            </span>
                        </div>

                        <button
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <form
                        onSubmit={handleLogin}
                        className="d-flex gap-2 flex-wrap w-100"
                    >
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Admin Email"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value,
                                })
                            }
                            required
                        />

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                })
                            }
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loginLoading}
                        >
                            {loginLoading ? 'Logging in...' : 'Login Admin'}
                        </button>
                    </form>
                )}
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}

            <div className="d-flex gap-2 mb-4">
                <button
                    className={`btn ${
                        activePage === 'genres'
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                    }`}
                    onClick={() => handlePageChange('genres')}
                >
                    Genres
                </button>

                <button
                    className={`btn ${
                        activePage === 'authors'
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                    }`}
                    onClick={() => handlePageChange('authors')}
                >
                    Authors
                </button>
            </div>

            <div className="card border-0 shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">
                        {activePage === 'genres'
                            ? 'Genre Management'
                            : 'Author Management'}
                    </h4>

                    {user?.role === 'admin' && (
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setShowForm(!showForm);
                                setError('');
                                setSuccess('');
                            }}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Add {activePage === 'genres' ? 'Genre' : 'Author'}
                        </button>
                    )}
                </div>

                {showForm && user?.role === 'admin' && (
                    <form
                        onSubmit={handleCreate}
                        className="border rounded p-3 mb-4"
                    >
                        <h5 className="mb-3">
                            Add New {activePage === 'genres' ? 'Genre' : 'Author'}
                        </h5>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        {activePage === 'genres' ? (
                            <div className="mb-3">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Photo URL
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.foto}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                foto: e.target.value,
                                            })
                                        }
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Bio</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                bio: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {loading && (
                    <p>Loading data...</p>
                )}

                {!loading && !error && activePage === 'genres' && (
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            {genres.map((genre) => (
                                <tr key={genre.id_genre}>
                                    <td>{genre.id_genre}</td>
                                    <td>{genre.name}</td>
                                    <td>{genre.description}</td>
                                </tr>
                            ))}

                            {genres.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No genre data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                {!loading && !error && activePage === 'authors' && (
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Bio</th>
                            </tr>
                        </thead>

                        <tbody>
                            {authors.map((author) => (
                                <tr key={author.id_author}>
                                    <td>{author.id_author}</td>
                                    <td>{author.name}</td>
                                    <td>{author.bio || '-'}</td>
                                </tr>
                            ))}

                            {authors.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No author data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

createRoot(document.getElementById('admin')).render(<Admin />);
