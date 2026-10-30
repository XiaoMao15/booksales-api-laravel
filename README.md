# Book Sales API

Book Sales API merupakan aplikasi REST API berbasis Laravel untuk mengelola data buku, author, dan genre. Project ini dikembangkan secara bertahap melalui penerapan konsep MVC, Migration, Seeder, Eloquent, REST API, dan Middleware.

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
- Menguji seluruh aturan akses menggunakan Postman.

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

## HTTP Response

| Status | Keterangan |
|---|---|
| `200 OK` | Permintaan berhasil |
| `201 Created` | Data berhasil dibuat |
| `401 Unauthorized` | Pengguna belum terautentikasi |
| `403 Forbidden` | Pengguna tidak memiliki hak akses |
| `404 Not Found` | Data yang diminta tidak ditemukan |

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

Untuk pengujian endpoint yang memerlukan autentikasi, gunakan Bearer Token dari Laravel Sanctum.

Untuk menambahkan atau memperbarui data, pilih metode HTTP yang sesuai, buka **Body → raw → JSON**, lalu masukkan data sesuai atribut tabel.

## Laporan

Laporan pengerjaan dan screenshot hasil pengujian tersedia di folder `laporan/`.

- Laporan Tugas 1 — MVC.
- Laporan Tugas 2 — Migration, Seeder, dan Eloquent.
- Laporan Tugas 3 — REST API.
- Laporan Tugas 4 — Read All dan Create Genre & Author.
- Laporan Tugas 5 — Show, Update, dan Destroy Genre & Author.
- Laporan Tugas 6 — Middleware dan Hak Akses.

## Repository

GitHub: https://github.com/XiaoMao15/booksales-api-laravel