## Update Tugas React JS Lanjutan #1 — Read dan Create Genre & Author

Pada tugas React JS Lanjutan pertama, project Book Sales dikembangkan dengan menambahkan antarmuka Admin menggunakan React JS. Fitur ini terintegrasi dengan REST API Laravel yang telah dibuat pada tugas sebelumnya.

### Fitur yang Dikembangkan

- Menggunakan React JS sebagai frontend untuk halaman Admin.
- Menggunakan Axios untuk melakukan komunikasi dengan REST API Laravel.
- Membuat fitur Login Admin menggunakan endpoint autentikasi Laravel Sanctum.
- Membuat fitur Logout untuk mengakhiri sesi autentikasi.
- Membuat fitur Read untuk menampilkan seluruh data Genre dan Author dari database.
- Membuat fitur Create untuk menambahkan data Genre dan Author melalui form.
- Menggunakan React Hooks, yaitu `useState` dan `useEffect`, untuk mengelola state dan mengambil data API.
- Menambahkan navigasi antara halaman Genre dan Author.
- Menampilkan pesan keberhasilan atau kegagalan ketika proses pengambilan dan penambahan data dilakukan.
- Membatasi tampilan fitur Create hanya untuk pengguna dengan role `admin`.

### Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| Laravel | Backend dan REST API |
| React JS | Frontend Admin |
| Axios | Komunikasi dengan REST API |
| Laravel Sanctum | Autentikasi menggunakan token |
| Bootstrap | Styling antarmuka |
| MariaDB | Database |

### Hasil Pengujian

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | Login menggunakan akun Admin | Berhasil |
| 2 | Logout Admin | Berhasil |
| 3 | Menampilkan seluruh data Genre | Berhasil |
| 4 | Menambahkan data Genre | Berhasil |
| 5 | Menampilkan seluruh data Author | Berhasil |
| 6 | Menambahkan data Author | Berhasil |

Fitur Read dan Create Genre serta Author berhasil diimplementasikan dan diuji melalui antarmuka React yang terhubung dengan REST API Laravel.

### Halaman Admin

Halaman Admin dapat diakses melalui:

`http://127.0.0.1:8000/admin/dashboard`

Laporan dan screenshot pengerjaan tersedia di folder `laporan/`.

- Laporan Tugas React JS Lanjutan #1 — Read dan Create Genre & Author.