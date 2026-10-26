<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Buku</title>
</head>
<body>
    <h1>Daftar Buku</h1>

    <table border="1" cellpadding="8">
        <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>ID Genre</th>
            <th>ID Penulis</th>
        </tr>

        @foreach ($books as $book)
            <tr>
                <td>{{ $book->id }}</td>
                <td>{{ $book->title }}</td>
                <td>{{ $book->description }}</td>
                <td>Rp{{ number_format($book->price, 0, ',', '.') }}</td>
                <td>{{ $book->stock }}</td>
                <td>{{ $book->genre_id }}</td>
                <td>{{ $book->author_id }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>
