import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import api from './connect';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Admin from './Frontend/Admin/admin';
import { navigate } from './navigate';

function Link({ href, children, ...props }) {
    const handleClick = (event) => {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();
        navigate(href);
    };

    return <a href={href} onClick={handleClick} {...props}>{children}</a>;
}

function useApiData(endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCurrent = true;

        setLoading(true);
        setError('');

        api.get(endpoint)
            .then((response) => {
                if (isCurrent) {
                    setData(response.data.data || []);
                }
            })
            .catch((requestError) => {
                if (isCurrent) {
                    setError(
                        requestError.response?.data?.message ||
                            'Data gagal dimuat. Silakan coba lagi.'
                    );
                }
            })
            .finally(() => {
                if (isCurrent) {
                    setLoading(false);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [endpoint]);

    return { data, loading, error };
}

function AppHeader() {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('auth_user')) || null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const syncUser = () => {
            try {
                setUser(JSON.parse(localStorage.getItem('auth_user')) || null);
            } catch {
                setUser(null);
            }
        };

        window.addEventListener('storage', syncUser);
        window.addEventListener('app:auth-changed', syncUser);

        return () => {
            window.removeEventListener('storage', syncUser);
            window.removeEventListener('app:auth-changed', syncUser);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch {
            // Local credentials must still be removed if the token expired.
        }

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-light bg-white py-3 site-navbar">
            <div className="container">
                <Link className="navbar-brand fw-bold" href="/">
                    <span className="brand-icon">B</span> Booksales
                </Link>
                <div className="site-navbar-menu">
                    <ul className="site-navbar-links">
                        <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/books">Books</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/authors">Authors</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/genres">Genres</Link></li>
                    </ul>
                    <div className="site-navbar-actions">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link className="btn btn-outline-primary" href="/admin/dashboard">Dashboard</Link>
                                )}
                                <button className="btn btn-primary px-4" onClick={handleLogout}>Keluar</button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-primary px-4" href="/login">Login</Link>
                                <Link className="btn btn-primary px-4" href="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

function PageStatus({ loading, error }) {
    if (loading) {
        return <p className="text-center py-5">Memuat data...</p>;
    }

    if (error) {
        return <div className="alert alert-danger my-4" role="alert">{error}</div>;
    }

    return null;
}

function BookCards({ books, emptyMessage = 'Belum ada buku.' }) {
    if (books.length === 0) {
        return <div className="col-12 text-center py-5"><p>{emptyMessage}</p></div>;
    }

    return books.map((book) => (
        <div className="col-6 col-md-4 col-lg-3" key={book.id}>
            <div className="book-card">
                <div className="book-cover">
                    {book.cover_foto ? (
                        <img src={assetUrl(book.cover_foto)} alt={book.title} />
                    ) : (
                        <span>No Cover</span>
                    )}
                </div>
                <div className="book-info">
                    <h5>{book.title}</h5>
                    <p>{formatPrice(book.price)}</p>
                    <Link className="btn btn-sm btn-outline-primary w-100" href={`/books/${book.id}`}>
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    ));
}

function HomePage() {
    const books = useApiData('/books');
    const genres = useApiData('/genres');

    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <span className="hero-label">DIGITAL LIBRARY</span>
                            <h1 className="hero-title">Discover Your Next <span>Favorite Book.</span></h1>
                            <p className="hero-description">
                                Explore our book collection, discover new knowledge, and find your next reading adventure.
                            </p>
                            <div className="d-flex gap-3 flex-wrap">
                                <Link className="btn btn-primary btn-lg" href="/books">Explore Books</Link>
                                <Link className="btn btn-outline-primary btn-lg" href="/authors">Discover Authors</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center mt-5 mt-lg-0">
                            <div className="hero-image">
                                <div className="hero-decoration"></div>
                                <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800" alt="Library" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container py-5">
                <div className="section-heading">
                    <div><span className="section-label">EXPLORE</span><h2>Browse Categories</h2><p>Find books based on your interests.</p></div>
                    <Link className="text-primary text-decoration-none" href="/genres">View All</Link>
                </div>
                <PageStatus loading={genres.loading} error={genres.error} />
                {!genres.loading && !genres.error && (
                    <div className="row g-4 mt-2">
                        {genres.data.length === 0 ? (
                            <div className="col-12"><p>Belum ada kategori.</p></div>
                        ) : genres.data.slice(0, 4).map((genre) => (
                            <div className="col-6 col-lg-3" key={genre.id_genre}>
                                <Link className="category-card" href={`/genres/${genre.id_genre}`}>
                                    <div className="category-icon"><i className="bi bi-book-half"></i></div>
                                    <h5>{genre.name}</h5>
                                    <span>Explore Books</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section className="featured-section py-5">
                <div className="container">
                    <div className="section-heading">
                        <div><span className="section-label">OUR COLLECTION</span><h2>Featured Books</h2><p>Discover books from our collection.</p></div>
                        <Link className="text-primary text-decoration-none" href="/books">View All Books</Link>
                    </div>
                    <PageStatus loading={books.loading} error={books.error} />
                    {!books.loading && !books.error && (
                        <div className="row g-4 mt-2">
                            <BookCards
                                books={[...books.data].sort((first, second) => second.id - first.id).slice(0, 4)}
                                emptyMessage="No books available yet."
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

function CatalogHeader({ label, title, description }) {
    return (
        <section className="catalog-header">
            <div className="container">
                <span className="section-label">{label}</span>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </section>
    );
}

function BooksPage({ id }) {
    const { data: books, loading, error } = useApiData('/books');
    const book = id ? books.find((item) => String(item.id) === id) : null;

    if (id) {
        return (
            <section className="container py-5">
                <Link className="text-decoration-none text-primary" href="/books">← Back to Catalog</Link>
                <PageStatus loading={loading} error={error} />
                {!loading && !error && !book && <div className="alert alert-warning mt-4">Buku tidak ditemukan.</div>}
                {!loading && !error && book && (
                    <div className="row g-5 mt-3">
                        <div className="col-md-4">
                            <div className="detail-cover">
                                {book.cover_foto ? <img src={assetUrl(book.cover_foto)} alt={book.title} /> : <span>No Cover Available</span>}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <span className="section-label">BOOK DETAILS</span>
                            <h1 className="detail-title">{book.title}</h1>
                            <h4 className="detail-price">{formatPrice(book.price)}</h4>
                            <div className="detail-description">
                                <h5>Description</h5><p>{book.description || 'No description available.'}</p>
                            </div>
                            <div className="detail-stock">Stock: {book.stock}</div>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    return (
        <>
            <CatalogHeader label="OUR COLLECTION" title="Explore Our Books" description="Discover books and find your next favorite read." />
            <section className="container py-5">
                <div className="catalog-toolbar">
                    <div><h4>Book Catalog</h4><p>Browse our available collection.</p></div>
                    {!loading && !error && <span className="book-count">{books.length} Books</span>}
                </div>
                <PageStatus loading={loading} error={error} />
                {!loading && !error && <div className="row g-4"><BookCards books={books} emptyMessage="There are no books in the collection yet." /></div>}
            </section>
        </>
    );
}

function AuthorsPage({ id }) {
    const { data: authors, loading, error } = useApiData(id ? `/authors/${id}` : '/authors');
    const author = id ? authors : null;
    const list = id ? [] : authors;

    if (id) {
        return (
            <section className="container py-5">
                <Link className="text-decoration-none text-primary" href="/authors">← Back to Authors</Link>
                <PageStatus loading={loading} error={error} />
                {!loading && !error && author && (
                    <div className="row align-items-center g-5 mt-3">
                        <div className="col-md-4 text-center">
                            <div className="author-detail-photo">
                                {author.foto ? <img src={assetUrl(author.foto)} alt={author.name} /> : <div className="author-placeholder">{author.name?.charAt(0).toUpperCase()}</div>}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <span className="section-label">AUTHOR PROFILE</span>
                            <h1 className="detail-title">{author.name}</h1>
                            <div className="detail-description"><h5>Biography</h5><p>{author.bio || 'No biography available.'}</p></div>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    return (
        <>
            <CatalogHeader label="OUR AUTHORS" title="Meet the Authors" description="Discover the writers behind your favorite books." />
            <section className="container py-5">
                <div className="catalog-toolbar"><div><h4>Our Authors</h4><p>Explore our collection of writers.</p></div>{!loading && !error && <span className="book-count">{list.length} Authors</span>}</div>
                <PageStatus loading={loading} error={error} />
                {!loading && !error && (
                    <div className="row g-4">
                        {list.length === 0 ? <div className="col-12 text-center py-5"><h5>No Authors Available</h5></div> : list.map((item) => (
                            <div className="col-6 col-md-4 col-lg-3" key={item.id_author}>
                                <div className="author-card">
                                    <div className="author-photo">
                                        {item.foto ? <img src={assetUrl(item.foto)} alt={item.name} /> : <div className="author-placeholder">{item.name?.charAt(0).toUpperCase()}</div>}
                                    </div>
                                    <div className="author-info"><h5>{item.name}</h5><Link className="btn btn-sm btn-outline-primary w-100" href={`/authors/${item.id_author}`}>View Profile</Link></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

function GenresPage({ id }) {
    const { data: genres, loading, error } = useApiData(id ? `/genres/${id}` : '/genres');
    const genre = id ? genres : null;

    if (id) {
        return (
            <section className="container py-5">
                <Link className="text-decoration-none text-primary" href="/genres">← Back to Genres</Link>
                <PageStatus loading={loading} error={error} />
                {!loading && !error && genre && (
                    <div className="genre-detail mt-4">
                        <div className="genre-detail-icon"><i className="bi bi-book-half"></i></div>
                        <span className="section-label">BOOK CATEGORY</span>
                        <h1 className="detail-title">{genre.name}</h1>
                        <div className="detail-description"><h5>About This Genre</h5><p>{genre.description || 'No description available.'}</p></div>
                    </div>
                )}
            </section>
        );
    }

    return (
        <>
            <CatalogHeader label="BOOK CATEGORIES" title="Explore Book Genres" description="Discover books across different categories and interests." />
            <section className="container py-5">
                <div className="catalog-toolbar"><div><h4>Our Genres</h4><p>Find your next reading interest.</p></div>{!loading && !error && <span className="book-count">{genres.length} Genres</span>}</div>
                <PageStatus loading={loading} error={error} />
                {!loading && !error && (
                    <div className="row g-4">
                        {genres.length === 0 ? <div className="col-12 text-center py-5"><h5>No Genres Available</h5></div> : genres.map((item) => (
                            <div className="col-6 col-md-4 col-lg-3" key={item.id_genre}>
                                <Link className="genre-card" href={`/genres/${item.id_genre}`}>
                                    <div className="genre-icon"><i className="bi bi-book-half"></i></div>
                                    <h5>{item.name}</h5><p>{item.description || 'Explore this category.'}</p><span className="genre-link">Explore Genre →</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

function App() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const updatePath = () => setPath(window.location.pathname);
        window.addEventListener('popstate', updatePath);

        return () => window.removeEventListener('popstate', updatePath);
    }, []);

    const normalizedPath = path.replace(/\/+$/, '') || '/';
    const [, section, id] = normalizedPath.match(/^\/(books|authors|genres)(?:\/(\d+))?$/) || [];
    const pageTitle = section
        ? `${section.charAt(0).toUpperCase()}${section.slice(1)} - Booksales`
        : normalizedPath === '/login'
            ? 'Login - Booksales'
            : normalizedPath === '/register'
                ? 'Register - Booksales'
                : normalizedPath === '/admin/dashboard'
                    ? 'Admin Dashboard - Booksales'
                    : 'Booksales - Digital Library';

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    let page;

    if (normalizedPath === '/') {
        page = <HomePage />;
    } else if (section === 'books') {
        page = <BooksPage id={id} />;
    } else if (section === 'authors') {
        page = <AuthorsPage id={id} />;
    } else if (section === 'genres') {
        page = <GenresPage id={id} />;
    } else if (normalizedPath === '/login') {
        page = <LoginForm />;
    } else if (normalizedPath === '/register') {
        page = <RegisterForm />;
    } else if (normalizedPath === '/admin/dashboard') {
        page = <Admin />;
    } else {
        page = <section className="container py-5"><h1>Halaman tidak ditemukan</h1><Link href="/">Kembali ke beranda</Link></section>;
    }

    return (
        <>
            <AppHeader />
            <main>{page}</main>
            <footer className="footer">
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col-md-6"><h5 className="fw-bold">Booksales</h5><p className="mb-0">Your gateway to a world of knowledge.</p></div>
                        <div className="col-md-6 text-md-end mt-3 mt-md-0"><small>&copy; {new Date().getFullYear()} Booksales. All rights reserved.</small></div>
                    </div>
                </div>
            </footer>
        </>
    );
}

function assetUrl(path) {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const filename = path.split(/[\\/]/).pop();

    return `/media/${encodeURIComponent(filename)}`;
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(price || 0);
}

createRoot(document.getElementById('app')).render(<App />);
