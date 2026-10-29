# Book Sales API

## Update Tugas 1

Pada tugas pertama, dibuat fitur untuk menampilkan data Genre dan Author menggunakan konsep MVC Laravel.

- Membuat Model `Genre` dan `Author`.
- Membuat `GenreController` dan `AuthorController` untuk mengambil data dari Model.
- Membuat halaman `genres.blade.php` dan `authors.blade.php` untuk menampilkan data.
- Menambahkan routing untuk halaman Genre dan Author di `routes/web.php`.

## Update Tugas 2

Pada tugas kedua, project dikembangkan dengan menggunakan Laravel Migration, Seeder, dan Eloquent untuk menampilkan data buku dan penulis dari database.

- Membuat Migration untuk tabel `books` dan `author`.
- Membuat `BookSeeder` dan `AuthorSeeder` untuk menambahkan lima data dummy masing-masing.
- Mengubah Model `Book`, `Author`, dan `Genre` agar menggunakan Eloquent.
- Menyesuaikan Controller agar mengambil data dari database.
- Membuat halaman `books.blade.php` untuk menampilkan data buku.
- Menyesuaikan halaman Genre dan Author agar menampilkan data dari database.
- Menambahkan routing untuk halaman Book, Author, dan Genre.

## Update Tugas 3

Pada tugas ketiga, project dikembangkan menjadi REST API menggunakan Laravel. Data buku, penulis, dan genre dikirim dalam format JSON dan diuji menggunakan Postman.

- Memindahkan routing Book, Author, dan Genre ke `routes/api.php`.
- Menyesuaikan `BookController`, `AuthorController`, dan `GenreController` agar mengembalikan respons JSON.
- Menggunakan metode HTTP `GET` untuk mengambil data dari database.
- Menghapus file view `books.blade.php`, `authors.blade.php`, dan `genres.blade.php` karena pengujian difokuskan pada API.
- Menguji ketiga endpoint menggunakan Postman dan memperoleh respons `200 OK`.

## Update Tugas 4

Pada tugas keempat, fitur REST API dikembangkan dengan menambahkan fungsi Read All dan Create untuk tabel Genre dan Author.

- Membuat fitur Read All untuk mengambil seluruh data Genre dan Author.
- Membuat fitur Create untuk menambahkan data Genre dan Author ke database.
- Menggunakan metode HTTP `GET` untuk mengambil data.
- Menggunakan metode HTTP `POST` untuk menambahkan data baru.
- Menggunakan Eloquent untuk mengambil dan menyimpan data.
- Mengembalikan respons dalam format JSON.
- Menguji fitur Read All dan Create menggunakan Postman, dengan respons `200 OK` untuk Read All dan `201 Created` untuk Create.

## Update Tugas 5

Pada tugas kelima, fitur REST API dikembangkan dengan menambahkan fungsi Show, Update, dan Destroy untuk tabel Genre dan Author.

- Membuat metode `show()` untuk mengambil satu data berdasarkan ID.
- Membuat metode `update()` untuk memperbarui data yang sudah ada.
- Membuat metode `destroy()` untuk menghapus data.
- Menambahkan validasi ketika data berdasarkan ID tidak ditemukan, dengan respons `404 Not Found`.
- Mengubah routing Genre dan Author menggunakan `Route::apiResource()`.
- Menguji fitur Show, Update, Destroy, dan validasi data yang tidak ditemukan menggunakan Postman.
- Pengujian berhasil dengan respons `200 OK` untuk Show, Update, dan Destroy, serta `404 Not Found` ketika data tidak ditemukan.

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/books` | Mengambil seluruh data buku |
| GET | `/api/authors` | Mengambil seluruh data penulis |
| POST | `/api/authors` | Menambahkan data penulis |
| GET | `/api/authors/{id}` | Mengambil data penulis berdasarkan ID |
| PUT/PATCH | `/api/authors/{id}` | Memperbarui data penulis |
| DELETE | `/api/authors/{id}` | Menghapus data penulis |
| GET | `/api/genres` | Mengambil seluruh data genre |
| POST | `/api/genres` | Menambahkan data genre |
| GET | `/api/genres/{id}` | Mengambil data genre berdasarkan ID |
| PUT/PATCH | `/api/genres/{id}` | Memperbarui data genre |
| DELETE | `/api/genres/{id}` | Menghapus data genre |

## Cara Menjalankan

Pastikan XAMPP dan database sudah berjalan. Kemudian jalankan perintah berikut di terminal pada folder project:

```bash
php artisan serve
```

Server Laravel biasanya dapat diakses melalui `http://127.0.0.1:8000`.

## Pengujian API

Gunakan Postman untuk menguji endpoint API berikut:

- Books: `http://127.0.0.1:8000/api/books`
- Authors: `http://127.0.0.1:8000/api/authors`
- Genres: `http://127.0.0.1:8000/api/genres`

Untuk menambahkan atau memperbarui data, pilih metode HTTP yang sesuai, buka **Body → raw → JSON**, lalu masukkan data sesuai atribut tabel.

## Laporan

Laporan pengerjaan dan screenshot hasil pengujian tersedia di folder `laporan/`.

- Laporan Tugas 1: `Laporan-Tugas-MVC.pdf`
- Laporan Tugas 2: `Laporan-Tugas2-MVC.pdf`
- Laporan Tugas 3: `Laporan-Tugas3-Res t API.pdf`
- Laporan Tugas 4: `Laporan-Tugas4-Read All dan Create Genre & Author.pdf`
- Laporan Tugas 5: `Laporan-Tugas5-Show, Update, Destroy Genre & Author.pdf`

## Repository

GitHub: https://github.com/XiaoMao15/booksales-api-laravel