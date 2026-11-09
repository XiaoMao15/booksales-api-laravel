## Update Tugas React JS Lanjutan #2 — Update dan Delete Genre & Author

Pada tugas React JS Lanjutan kedua, project Book Sales dikembangkan dengan melanjutkan fitur Admin React JS yang telah dibuat pada tugas sebelumnya. Fitur yang ditambahkan adalah Update dan Delete untuk data Genre dan Author.

### Fitur yang Dikembangkan

- Menambahkan fitur Update data Genre melalui halaman Admin.
- Menambahkan fitur Delete data Genre melalui halaman Admin.
- Menambahkan fitur Update data Author melalui halaman Admin.
- Menambahkan fitur Delete data Author melalui halaman Admin.
- Menambahkan tombol Edit dan Delete pada tabel Genre dan Author.
- Menambahkan form untuk mengubah data yang sudah tersimpan.
- Menambahkan konfirmasi sebelum data dihapus.
- Menampilkan pesan keberhasilan setelah proses Update dan Delete berhasil.
- Tetap menggunakan Axios untuk komunikasi dengan REST API Laravel.
- Membatasi proses Update dan Delete hanya untuk pengguna dengan role `admin`.

### Hasil Pengujian

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | Update data Genre | Berhasil |
| 2 | Delete data Genre | Berhasil |
| 3 | Update data Author | Berhasil |
| 4 | Delete data Author | Berhasil |

Fitur Update dan Delete Genre serta Author berhasil diimplementasikan dan diuji melalui halaman Admin React yang terhubung dengan REST API Laravel.

### Laporan

Laporan dan screenshot pengerjaan Tugas React JS Lanjutan #2 tersedia di folder `laporan/`.

- Laporan Tugas React JS Lanjutan #2 — Update dan Delete Genre & Author.

## Update Tugas React JS Lanjutan #4 — Routing & Hak Akses Pengguna

Pada tugas React JS Lanjutan keempat, project Book Sales dilengkapi dengan pengaturan routing dan hak akses berdasarkan role pengguna (`user` dan `admin`).

### Fitur yang Dikembangkan

- Membatasi halaman Admin Dashboard agar hanya dapat diakses oleh pengguna dengan role `admin`.
- Mengarahkan pengguna yang belum login ke halaman Login saat membuka Dashboard Admin.
- Mengarahkan pengguna non-admin ke halaman beranda jika mencoba membuka Dashboard Admin.
- Menyimpan dan membaca informasi autentikasi dari `localStorage`.
- Menyinkronkan tampilan setelah login dan logout.
- Membiarkan halaman beranda, buku, author, dan genre tetap dapat diakses semua pengguna.
- Tetap menggunakan middleware Laravel untuk melindungi endpoint API.

### Hasil Verifikasi

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | Build frontend dengan Vite | Berhasil |

Routing dan pembatasan akses pengguna telah ditambahkan pada frontend React. Hak akses endpoint tetap divalidasi oleh middleware Laravel.