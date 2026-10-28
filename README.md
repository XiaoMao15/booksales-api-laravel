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

### Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/books` | Mengambil seluruh data buku |
| GET | `/api/authors` | Mengambil seluruh data penulis |
| POST | `/api/authors` | Menambahkan data penulis |
| GET | `/api/genres` | Mengambil seluruh data genre |
| POST | `/api/genres` | Menambahkan data genre |

## Cara Menjalankan

Pastikan XAMPP dan database sudah berjalan, lalu jalankan perintah berikut di terminal:

```bash
php artisan serve
```

### Endpoint API

Gunakan Postman atau browser untuk mengakses endpoint berikut:

- Books: `http://127.0.0.1:8000/api/books`
- Authors: `http://127.0.0.1:8000/api/authors`
- Genres: `http://127.0.0.1:8000/api/genres`

Untuk menambahkan data, gunakan metode HTTP `POST` melalui Postman, pilih **Body → raw → JSON**, lalu masukkan data sesuai atribut tabel.

## Laporan

Laporan pengerjaan dan screenshot hasil pengujian tersedia di folder `laporan/`.

- Laporan Tugas 1: `Laporan-Tugas-MVC.pdf`
- Laporan Tugas 2: `Laporan-Tugas2-MVC.pdf`
- Laporan Tugas 3: `Laporan-Tugas3-REST-API.pdf`
- Laporan Tugas 4: `Laporan-Tugas4-Read All dan Create Genre & Author.pdf`

## Repository

GitHub: https://github.com/XiaoMao15/booksales-api-laravel
