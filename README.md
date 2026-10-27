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

Ketiga endpoint menggunakan metode HTTP `GET` dan mengembalikan data dalam format JSON.

## Laporan

Laporan pengerjaan dan screenshot hasil pengujian tersedia di folder `laporan/`.

- Laporan Tugas 1: `Laporan-Tugas-MVC.pdf`
- Laporan Tugas 2: `Laporan-Tugas2-MVC.pdf`
- Laporan Tugas 3: `Laporan-Tugas3-REST-API.pdf`
