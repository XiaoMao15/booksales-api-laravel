<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Author</title>
</head>
<body>
    <h1>Daftar Penulis Buku</h1>

    <table border="1" cellpadding="8">
        <tr>
            <th>ID</th>
            <th>Nama Penulis</th>
            <th>Biografi</th>
        </tr>

        @foreach ($authors as $author)
            <tr>
                <td>{{ $author->id_author }}</td>
                <td>{{ $author->name }}</td>
                <td>{{ $author->bio }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>
