<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Genre</title>
</head>
<body>
    <h1>Daftar Genre Buku</h1>

    <table border="1" cellpadding="8">
        <tr>
            <th>ID</th>
            <th>Nama Genre</th>
            <th>Deskripsi</th>
        </tr>

        @foreach ($genres as $genre)
            <tr>
                <td>{{ $genre['id'] }}</td>
                <td>{{ $genre['name'] }}</td>
                <td>{{ $genre['description'] }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>
