# Book Sales API

Book Sales API merupakan aplikasi REST API berbasis Laravel untuk mengelola data buku, author, genre, dan transaksi. Project ini dikembangkan secara bertahap melalui penerapan konsep MVC, Migration, Seeder, Eloquent, REST API, Middleware, autentikasi, dan pengaturan hak akses pengguna.

## Update Tugas 1 — MVC

Pada tugas pertama, dibuat fitur untuk menampilkan data Genre dan Author menggunakan konsep MVC Laravel.

- Membuat Model `Genre` dan `Author`.
- Membuat `GenreController` dan `AuthorController` untuk mengambil data dari Model.
- Membuat halaman `genres.blade.php` dan `authors.blade.php` untuk menampilkan data.
- Menambahkan routing untuk halaman Genre dan Author di `routes/web.php`.

## Update Tugas 2 — Migration, Seeder, dan Eloquent

Pada tugas kedua, project dikembangkan dengan menggunakan Laravel Migration, Seeder, dan Eloquent untuk menampilkan data buku dan penulis dari database.

- Membuat Migration untuk tabel `books` dan `authors`.
- Membuat `BookSeeder` dan `AuthorSeeder` untuk menambahkan lima data dummy masing-masing.
- Mengubah Model `Book`, `Author`, dan `Genre` agar menggunakan Eloquent.
- Menyesuaikan Controller agar mengambil data dari database.
- Membuat halaman `books.blade.php` untuk menampilkan data buku.
- Menyesuaikan halaman Genre dan Author agar menampilkan data dari database.
- Menambahkan routing untuk halaman Book, Author, dan Genre.

## Update Tugas 3 — REST API

Pada tugas ketiga, project dikembangkan menjadi REST API menggunakan Laravel. Data buku, penulis, dan genre dikirim dalam format JSON dan diuji menggunakan Postman.

- Memindahkan routing Book, Author, dan Genre ke `routes/api.php`.
- Menyesuaikan `BookController`, `AuthorController`, dan `GenreController` agar mengembalikan respons JSON.
- Menggunakan metode HTTP `GET` untuk mengambil data dari database.
- Menghapus file view `books.blade.php`, `authors.blade.php`, dan `genres.blade.php` karena pengujian difokuskan pada API.
- Menguji ketiga endpoint menggunakan Postman dan memperoleh respons `200 OK`.

## Update Tugas 4 — Read All dan Create

Pada tugas keempat, fitur REST API dikembangkan dengan menambahkan fungsi Read All dan Create untuk tabel Genre dan Author.

- Membuat fitur Read All untuk mengambil seluruh data Genre dan Author.
- Membuat fitur Create untuk menambahkan data Genre dan Author ke database.
- Menggunakan metode HTTP `GET` untuk mengambil data.
- Menggunakan metode HTTP `POST` untuk menambahkan data baru.
- Menggunakan Eloquent untuk mengambil dan menyimpan data.
- Mengembalikan respons dalam format JSON.
- Menguji fitur Read All dan Create menggunakan Postman, dengan respons `200 OK` untuk Read All dan `201 Created` untuk Create.

## Update Tugas 5 — Show, Update, dan Destroy

Pada tugas kelima, fitur REST API dikembangkan dengan menambahkan fungsi Show, Update, dan Destroy untuk tabel Genre dan Author.

- Membuat metode `show()` untuk mengambil satu data berdasarkan ID.
- Membuat metode `update()` untuk memperbarui data yang sudah ada.
- Membuat metode `destroy()` untuk menghapus data.
- Menambahkan validasi ketika data berdasarkan ID tidak ditemukan, dengan respons `404 Not Found`.
- Mengubah routing Genre dan Author menggunakan `Route::apiResource()`.
- Menguji fitur Show, Update, Destroy, dan validasi data yang tidak ditemukan menggunakan Postman.
- Pengujian berhasil dengan respons `200 OK` untuk Show, Update, dan Destroy, serta `404 Not Found` ketika data tidak ditemukan.

## Update Tugas 6 — Middleware dan Hak Akses

Pada tugas keenam, project dikembangkan dengan menerapkan Middleware untuk membatasi akses API berdasarkan autentikasi dan role pengguna.

- Membuat `AdminMiddleware` untuk memeriksa hak akses administrator.
- Mendaftarkan alias middleware `admin` pada `bootstrap/app.php`.
- Menambahkan kolom `role` pada tabel `users` melalui Migration.
- Menggunakan Laravel Sanctum untuk autentikasi berbasis token.
- Mengatur routing pada `routes/api.php` agar Read All dan Show Author serta Genre dapat diakses secara publik.
- Membatasi akses Create, Update, dan Destroy Author serta Genre hanya untuk pengguna dengan role `admin`.
- Menguji aturan akses menggunakan Postman.

### Pembagian Hak Akses

| Role | Hak Akses |
|---|---|
| Publik (tanpa login) | Read All dan Show Author serta Genre |
| User | Tidak dapat melakukan Create, Update, dan Destroy |
| Admin | Dapat melakukan Create, Update, dan Destroy |

### Hasil Pengujian Middleware

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | GET All Authors tanpa login | 200 OK |
| 2 | GET All Genres tanpa login | 200 OK |
| 3 | GET Author berdasarkan ID tanpa login | 200 OK |
| 4 | GET Genre berdasarkan ID tanpa login | 200 OK |
| 5 | POST Author tanpa login | 401 Unauthorized |
| 6 | POST Genre tanpa login | 401 Unauthorized |
| 7 | POST Author sebagai user biasa | 403 Forbidden |
| 8 | POST Author sebagai admin | 201 Created |
| 9 | POST Genre sebagai admin | 201 Created |
| 10 | PUT Author sebagai admin | 200 OK |
| 11 | PUT Genre sebagai admin | 200 OK |
| 12 | DELETE Author sebagai admin | 200 OK |
| 13 | DELETE Genre sebagai admin | 200 OK |

## Update Tugas 7 — CRUD Transaksi

Pada tugas ketujuh, project dikembangkan dengan menambahkan fitur CRUD untuk tabel Transaksi. Fitur ini menghubungkan data pengguna dan buku melalui relasi Eloquent serta menerapkan pembatasan akses berdasarkan role pengguna.

- Membuat Model `Transaction` untuk mengelola data transaksi.
- Membuat relasi `belongsTo()` antara Transaction dengan User dan Book.
- Menggunakan Migration untuk mendefinisikan struktur tabel transaksi serta menambahkan kolom `quantity`.
- Membuat `TransactionController` untuk menangani proses Create, Read All, Show, Update, dan Destroy.
- Membuat `CustomerMiddleware` untuk membatasi akses fitur transaksi bagi pengguna dengan role `user`.
- Menggunakan Laravel Sanctum untuk autentikasi dan pengamanan endpoint transaksi.
- Menghasilkan nomor pesanan (`order_number`) secara otomatis.
- Mengambil `customer_id` dari pengguna yang sedang login.
- Menghitung `total_amount` berdasarkan harga buku dan jumlah pembelian.
- Memeriksa ketersediaan stok buku sebelum transaksi dibuat dan memperbarui stok setelah transaksi berhasil.
- Mengatur hak akses Create, Show, dan Update untuk Customer, sedangkan Read All dan Destroy hanya dapat dilakukan Admin.
- Menggunakan relasi Eloquent untuk menampilkan informasi pengguna dan buku pada data transaksi.
- Menguji seluruh fitur transaksi menggunakan Postman.

### Pembagian Hak Akses Transaksi

| Role | Hak Akses |
|---|---|
| Customer (`user`) | Create, Show, dan Update transaksi |
| Admin | Read All dan Destroy transaksi |

### Endpoint Transaksi

| Method | Endpoint | Fungsi | Hak Akses |
|---|---|---|---|
| POST | `/api/transactions` | Membuat transaksi baru | Customer |
| GET | `/api/transactions` | Mengambil seluruh data transaksi | Admin |
| GET | `/api/transactions/{id}` | Mengambil detail transaksi | Customer |
| PUT | `/api/transactions/{id}` | Memperbarui transaksi | Customer |
| DELETE | `/api/transactions/{id}` | Menghapus transaksi | Admin |

### Hasil Pengujian Transaksi

Pengujian dilakukan menggunakan Postman dengan hasil sebagai berikut:

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | Login sebagai Customer | 200 OK |
| 2 | Login sebagai Admin | 200 OK |
| 3 | Logout | 200 OK |
| 4 | POST Create Transaction sebagai Customer | 200 OK |
| 5 | GET Show Transaction | 200 OK |
| 6 | PUT Update Transaction sebagai Customer | 200 OK |
| 7 | GET Read All Transactions sebagai Admin | 200 OK |
| 8 | DELETE Transaction sebagai Admin | 200 OK |
| 9 | GET Books | 200 OK |

## Endpoint API

| Method | Endpoint | Fungsi | Hak Akses |
|---|---|---|---|
| GET | `/api/books` | Mengambil seluruh data buku | Publik |
| GET | `/api/authors` | Mengambil seluruh data author | Publik |
| GET | `/api/authors/{id}` | Mengambil detail author | Publik |
| POST | `/api/authors` | Menambahkan author | Admin |
| PUT/PATCH | `/api/authors/{id}` | Memperbarui author | Admin |
| DELETE | `/api/authors/{id}` | Menghapus author | Admin |
| GET | `/api/genres` | Mengambil seluruh data genre | Publik |
| GET | `/api/genres/{id}` | Mengambil detail genre | Publik |
| POST | `/api/genres` | Menambahkan genre | Admin |
| PUT/PATCH | `/api/genres/{id}` | Memperbarui genre | Admin |
| DELETE | `/api/genres/{id}` | Menghapus genre | Admin |
| POST | `/api/login` | Login pengguna | Publik |
| POST | `/api/logout` | Logout pengguna | Terautentikasi |
| POST | `/api/transactions` | Membuat transaksi | Customer |
| GET | `/api/transactions` | Mengambil seluruh transaksi | Admin |
| GET | `/api/transactions/{id}` | Mengambil detail transaksi | Customer |
| PUT | `/api/transactions/{id}` | Memperbarui transaksi | Customer |
| DELETE | `/api/transactions/{id}` | Menghapus transaksi | Admin |

## HTTP Response

| Status | Keterangan |
|---|---|
| `200 OK` | Permintaan berhasil |
| `201 Created` | Data berhasil dibuat |
| `400 Bad Request` | Permintaan tidak dapat diproses, misalnya stok tidak mencukupi |
| `401 Unauthorized` | Pengguna belum terautentikasi |
| `403 Forbidden` | Pengguna tidak memiliki hak akses |
| `404 Not Found` | Data yang diminta tidak ditemukan |
| `422 Unprocessable Entity` | Data tidak memenuhi validasi |

## Cara Menjalankan

Pastikan XAMPP dan database sudah berjalan. Kemudian jalankan perintah berikut di terminal pada folder project:

1. Install dependency:

   ```bash
   composer install
   ```

2. Salin konfigurasi environment:

   ```bash
   cp .env.example .env
   ```

3. Generate application key:

   ```bash
   php artisan key:generate
   ```

4. Sesuaikan konfigurasi database pada file `.env`.

5. Jalankan migration:

   ```bash
   php artisan migrate
   ```

6. Jalankan server Laravel:

   ```bash
   php artisan serve
   ```

Server Laravel biasanya dapat diakses melalui `http://127.0.0.1:8000`.

## Pengujian API

Pengujian dilakukan menggunakan Postman dengan alamat berikut:

- Books: `http://127.0.0.1:8000/api/books`
- Authors: `http://127.0.0.1:8000/api/authors`
- Genres: `http://127.0.0.1:8000/api/genres`
- Login: `http://127.0.0.1:8000/api/login`
- Logout: `http://127.0.0.1:8000/api/logout`
- Transactions: `http://127.0.0.1:8000/api/transactions`

Untuk pengujian endpoint yang memerlukan autentikasi, gunakan Bearer Token dari Laravel Sanctum.

Untuk menambahkan atau memperbarui data, pilih metode HTTP yang sesuai, buka **Body → raw → JSON**, lalu masukkan data sesuai atribut yang diperlukan.

## Laporan

Laporan pengerjaan dan screenshot hasil pengujian tersedia di folder `laporan/`.

- Laporan Tugas 1 — MVC.
- Laporan Tugas 2 — Migration, Seeder, dan Eloquent.
- Laporan Tugas 3 — REST API.
- Laporan Tugas 4 — Read All dan Create Genre & Author.
- Laporan Tugas 5 — Show, Update, dan Destroy Genre & Author.
- Laporan Tugas 6 — Middleware dan Hak Akses.
- Laporan Tugas 7 — CRUD Transaksi.

## Repository

GitHub: https://github.com/XiaoMao15/booksales-api-laravel
