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

## Cara Menjalankan

Pastikan XAMPP dan database sudah berjalan, lalu jalankan perintah berikut di terminal:

```bash
php artisan serve
```

Kemudian buka halaman berikut di browser:

- Book: http://127.0.0.1:8000/books
- Author: http://127.0.0.1:8000/authors
- Genre: http://127.0.0.1:8000/genres

## Laporan

Laporan pengerjaan dan screenshot hasil pengujian tersedia di folder `laporan/`.

- Laporan Tugas 1: `Laporan-Tugas-MVC.pdf`
- Laporan Tugas 2: `Laporan-Tugas2-MVC.pdf`
