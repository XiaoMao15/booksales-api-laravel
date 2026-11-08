import React, { useEffect, useState } from 'react';
import api from '../../connect';

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
    const [editingId, setEditingId] = useState(null);

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
            const endpoint = activePage === 'genres'
                ? '/genres'
                : '/authors';

            const response = await api.get(endpoint);

            if (activePage === 'genres') {
                setGenres(response.data.data || []);
            } else {
                setAuthors(response.data.data || []);
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Gagal mengambil data.'
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
                setError('Akun ini bukan admin.');
                return;
            }

            localStorage.setItem('auth_token', token);
            localStorage.setItem(
                'auth_user',
                JSON.stringify(loggedUser)
            );

            window.dispatchEvent(new Event('app:auth-changed'));
            setUser(loggedUser);

            setLoginData({
                email: '',
                password: '',
            });

            setSuccess('Login berhasil.');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Email atau password salah.'
            );
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (err) {
            // Logout tetap dilanjutkan walaupun request gagal.
        }

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');

        setUser(null);
        setShowForm(false);
        setEditingId(null);

        setSuccess('');
        setError('');
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            foto: '',
            bio: '',
        });

        setEditingId(null);
        setShowForm(false);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        resetForm();

        setError('');
        setSuccess('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        setError('');
        setSuccess('');

        setFormData({
            name: '',
            description: '',
            foto: '',
            bio: '',
        });

        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (item) => {
        setError('');
        setSuccess('');

        if (activePage === 'genres') {
            setFormData({
                name: item.name || '',
                description: item.description || '',
                foto: '',
                bio: '',
            });

            setEditingId(item.id_genre);
        } else {
            setFormData({
                name: item.name || '',
                description: '',
                foto: item.foto || '',
                bio: item.bio || '',
            });

            setEditingId(item.id_author);
        }

        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || user.role !== 'admin') {
            setError('Hanya admin yang dapat melakukan tindakan ini.');
            return;
        }

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            let endpoint = '';
            let payload = {};

            if (activePage === 'genres') {
                endpoint = editingId !== null
                    ? `/genres/${editingId}`
                    : '/genres';

                payload = {
                    name: formData.name,
                    description: formData.description,
                };
            } else {
                endpoint = editingId !== null
                    ? `/authors/${editingId}`
                    : '/authors';

                payload = {
                    name: formData.name,
                    foto: formData.foto || null,
                    bio: formData.bio || null,
                };
            }

            if (editingId !== null) {
                await api.put(endpoint, payload);

                setSuccess(
                    activePage === 'genres'
                        ? 'Genre berhasil diperbarui.'
                        : 'Author berhasil diperbarui.'
                );
            } else {
                await api.post(endpoint, payload);

                setSuccess(
                    activePage === 'genres'
                        ? 'Genre berhasil ditambahkan.'
                        : 'Author berhasil ditambahkan.'
                );
            }

            resetForm();
            await fetchData();
        } catch (err) {
            const validationErrors = err.response?.data?.errors;

            if (validationErrors) {
                const firstError = Object.values(validationErrors)[0];

                setError(
                    Array.isArray(firstError)
                        ? firstError[0]
                        : 'Data tidak valid.'
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    'Gagal menyimpan data.'
                );
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!user || user.role !== 'admin') {
            setError('Hanya admin yang dapat menghapus data.');
            return;
        }

        const itemName = activePage === 'genres'
            ? 'genre'
            : 'author';

        const confirmed = window.confirm(
            `Yakin ingin menghapus ${itemName} ini?`
        );

        if (!confirmed) {
            return;
        }

        setError('');
        setSuccess('');

        try {
            const endpoint = activePage === 'genres'
                ? `/genres/${id}`
                : `/authors/${id}`;

            await api.delete(endpoint);

            setSuccess(
                activePage === 'genres'
                    ? 'Genre berhasil dihapus.'
                    : 'Author berhasil dihapus.'
            );

            await fetchData();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Gagal menghapus data.'
            );
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#f4f6f8',
                padding: '30px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        background: '#ffffff',
                        padding: '25px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <h1 style={{ margin: 0 }}>
                            Book Sales Management
                        </h1>

                        <p
                            style={{
                                margin: '8px 0 0',
                                color: '#666',
                            }}
                        >
                            Admin Dashboard
                        </p>
                    </div>

                    {user && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                            }}
                        >
                            <div>
                                <strong>{user.name}</strong>

                                <span
                                    style={{
                                        marginLeft: '8px',
                                        padding: '4px 8px',
                                        borderRadius: '5px',
                                        background: '#e8f0fe',
                                        color: '#1a73e8',
                                        fontSize: '12px',
                                    }}
                                >
                                    Admin
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                style={{
                                    padding: '8px 14px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    background: '#dc3545',
                                    color: '#fff',
                                    cursor: 'pointer',
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Login */}
                {!user ? (
                    <div
                        style={{
                            maxWidth: '450px',
                            margin: '50px auto',
                            background: '#fff',
                            padding: '30px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                    >
                        <h2>Admin Login</h2>

                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Email</label>

                                <input
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '6px',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>Password</label>

                                <input
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '6px',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    background: '#007bff',
                                    color: '#fff',
                                    cursor: 'pointer',
                                }}
                            >
                                {loginLoading
                                    ? 'Logging in...'
                                    : 'Login'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        {/* Alert */}
                        {error && (
                            <div
                                style={{
                                    background: '#f8d7da',
                                    color: '#842029',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    marginBottom: '15px',
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {success && (
                            <div
                                style={{
                                    background: '#d1e7dd',
                                    color: '#0f5132',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    marginBottom: '15px',
                                }}
                            >
                                {success}
                            </div>
                        )}

                        {/* Tabs */}
                        <div
                            style={{
                                background: '#fff',
                                padding: '10px',
                                borderRadius: '10px',
                                marginBottom: '20px',
                                display: 'flex',
                                gap: '10px',
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => handlePageChange('genres')}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    background:
                                        activePage === 'genres'
                                            ? '#007bff'
                                            : '#e9ecef',
                                    color:
                                        activePage === 'genres'
                                            ? '#fff'
                                            : '#000',
                                }}
                            >
                                Genres
                            </button>

                            <button
                                type="button"
                                onClick={() => handlePageChange('authors')}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    background:
                                        activePage === 'authors'
                                            ? '#007bff'
                                            : '#e9ecef',
                                    color:
                                        activePage === 'authors'
                                            ? '#fff'
                                            : '#000',
                                }}
                            >
                                Authors
                            </button>
                        </div>

                        {/* Main Card */}
                        <div
                            style={{
                                background: '#fff',
                                borderRadius: '12px',
                                padding: '25px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            }}
                        >
                            {/* Title */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '20px',
                                }}
                            >
                                <div>
                                    <h2 style={{ margin: 0 }}>
                                        {activePage === 'genres'
                                            ? 'Genre Management'
                                            : 'Author Management'}
                                    </h2>

                                    <p
                                        style={{
                                            color: '#666',
                                            margin: '6px 0 0',
                                        }}
                                    >
                                        {activePage === 'genres'
                                            ? 'Kelola data genre buku.'
                                            : 'Kelola data author buku.'}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAdd}
                                    style={{
                                        padding: '10px 16px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        background: '#198754',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                >
                                    + Add{' '}
                                    {activePage === 'genres'
                                        ? 'Genre'
                                        : 'Author'}
                                </button>
                            </div>

                            {/* Form */}
                            {showForm && (
                                <div
                                    style={{
                                        background: '#f8f9fa',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '8px',
                                        padding: '20px',
                                        marginBottom: '25px',
                                    }}
                                >
                                    <h3 style={{ marginTop: 0 }}>
                                        {editingId !== null
                                            ? `Edit ${
                                                  activePage === 'genres'
                                                      ? 'Genre'
                                                      : 'Author'
                                              }`
                                            : `Add ${
                                                  activePage === 'genres'
                                                      ? 'Genre'
                                                      : 'Author'
                                              }`}
                                    </h3>

                                    <form onSubmit={handleSubmit}>
                                        <div
                                            style={{
                                                display: 'grid',
                                                gap: '15px',
                                            }}
                                        >
                                            <div>
                                                <label>
                                                    Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        marginTop: '6px',
                                                        boxSizing:
                                                            'border-box',
                                                    }}
                                                />
                                            </div>

                                            {activePage === 'genres' ? (
                                                <div>
                                                    <label>
                                                        Description
                                                    </label>

                                                    <textarea
                                                        name="description"
                                                        value={
                                                            formData.description
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                        rows="4"
                                                        style={{
                                                            width: '100%',
                                                            padding: '10px',
                                                            marginTop: '6px',
                                                            boxSizing:
                                                                'border-box',
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div>
                                                        <label>
                                                            Foto URL
                                                        </label>

                                                        <input
                                                            type="text"
                                                            name="foto"
                                                            value={
                                                                formData.foto
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            placeholder="https://..."
                                                            style={{
                                                                width: '100%',
                                                                padding: '10px',
                                                                marginTop:
                                                                    '6px',
                                                                boxSizing:
                                                                    'border-box',
                                                            }}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label>
                                                            Bio
                                                        </label>

                                                        <textarea
                                                            name="bio"
                                                            value={
                                                                formData.bio
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            rows="4"
                                                            style={{
                                                                width: '100%',
                                                                padding: '10px',
                                                                marginTop:
                                                                    '6px',
                                                                boxSizing:
                                                                    'border-box',
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div
                                            style={{
                                                marginTop: '15px',
                                                display: 'flex',
                                                gap: '10px',
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                style={{
                                                    padding: '10px 18px',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    background: '#007bff',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {saving
                                                    ? 'Saving...'
                                                    : editingId !== null
                                                    ? 'Update'
                                                    : 'Save'}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                style={{
                                                    padding: '10px 18px',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    background: '#6c757d',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Loading */}
                            {loading ? (
                                <p>Loading data...</p>
                            ) : activePage === 'genres' ? (
                                /* Genre Table */
                                <div style={{ overflowX: 'auto' }}>
                                    <table
                                        style={{
                                            width: '100%',
                                            borderCollapse:
                                                'collapse',
                                        }}
                                    >
                                        <thead>
                                            <tr
                                                style={{
                                                    background:
                                                        '#f1f3f5',
                                                }}
                                            >
                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'left',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    ID
                                                </th>

                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'left',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'left',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    Description
                                                </th>

                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'center',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {genres.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        style={{
                                                            padding:
                                                                '20px',
                                                            textAlign:
                                                                'center',
                                                        }}
                                                    >
                                                        Belum ada data
                                                        genre.
                                                    </td>
                                                </tr>
                                            ) : (
                                                genres.map(
                                                    (genre) => (
                                                        <tr
                                                            key={
                                                                genre.id_genre
                                                            }
                                                        >
                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                }}
                                                            >
                                                                {
                                                                    genre.id_genre
                                                                }
                                                            </td>

                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                }}
                                                            >
                                                                {
                                                                    genre.name
                                                                }
                                                            </td>

                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                }}
                                                            >
                                                                {
                                                                    genre.description
                                                                }
                                                            </td>

                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                    textAlign:
                                                                        'center',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            'flex',
                                                                        justifyContent:
                                                                            'center',
                                                                        gap: '8px',
                                                                    }}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                genre
                                                                            )
                                                                        }
                                                                        style={{
                                                                            padding:
                                                                                '7px 12px',
                                                                            border: 'none',
                                                                            borderRadius:
                                                                                '5px',
                                                                            background:
                                                                                '#ffc107',
                                                                            color: '#000',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                genre.id_genre
                                                                            )
                                                                        }
                                                                        style={{
                                                                            padding:
                                                                                '7px 12px',
                                                                            border: 'none',
                                                                            borderRadius:
                                                                                '5px',
                                                                            background:
                                                                                '#dc3545',
                                                                            color: '#fff',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                /* Author Table */
                                <div style={{ overflowX: 'auto' }}>
                                    <table
                                        style={{
                                            width: '100%',
                                            borderCollapse:
                                                'collapse',
                                        }}
                                    >
                                        <thead>
                                            <tr
                                                style={{
                                                    background:
                                                        '#f1f3f5',
                                                }}
                                            >
                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'left',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    ID
                                                </th>

                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'left',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'left',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    Bio
                                                </th>

                                                <th
                                                    style={{
                                                        padding:
                                                            '12px',
                                                        textAlign:
                                                            'center',
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                    }}
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {authors.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        style={{
                                                            padding:
                                                                '20px',
                                                            textAlign:
                                                                'center',
                                                        }}
                                                    >
                                                        Belum ada data
                                                        author.
                                                    </td>
                                                </tr>
                                            ) : (
                                                authors.map(
                                                    (author) => (
                                                        <tr
                                                            key={
                                                                author.id_author
                                                            }
                                                        >
                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                }}
                                                            >
                                                                {
                                                                    author.id_author
                                                                }
                                                            </td>

                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                }}
                                                            >
                                                                {
                                                                    author.name
                                                                }
                                                            </td>

                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                }}
                                                            >
                                                                {
                                                                    author.bio ||
                                                                    '-'
                                                                }
                                                            </td>

                                                            <td
                                                                style={{
                                                                    padding:
                                                                        '12px',
                                                                    borderBottom:
                                                                        '1px solid #eee',
                                                                    textAlign:
                                                                        'center',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            'flex',
                                                                        justifyContent:
                                                                            'center',
                                                                        gap: '8px',
                                                                    }}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                author
                                                                            )
                                                                        }
                                                                        style={{
                                                                            padding:
                                                                                '7px 12px',
                                                                            border: 'none',
                                                                            borderRadius:
                                                                                '5px',
                                                                            background:
                                                                                '#ffc107',
                                                                            color: '#000',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                author.id_author
                                                                            )
                                                                        }
                                                                        style={{
                                                                            padding:
                                                                                '7px 12px',
                                                                            border: 'none',
                                                                            borderRadius:
                                                                                '5px',
                                                                            background:
                                                                                '#dc3545',
                                                                            color: '#fff',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;