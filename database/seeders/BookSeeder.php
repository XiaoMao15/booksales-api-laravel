<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title' => 'Lord of the Mysteries',
                'description' => 'Petualangan Klein Moretti di dunia steampunk dan sihir.',
                'price' => 80000,
                'stock' => 50,
                'cover_foto' => 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1747185207i/222645586.jpg',
                'genre_id' => 1,
                'author_id' => 4,
            ],
            [
                'title' => 'Reverend Insanity',
                'description' => 'Perjalanan Fang Yuan mengejar keabadian.',
                'price' => 90000,
                'stock' => 20,
                'cover_foto' => 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1524131925i/39892810.jpg',
                'genre_id' => 1,
                'author_id' => 6,
            ],
            [
                'title' => 'Omniscient Reader\'s Viewpoint',
                'description' => 'Kim Dokja bertahan hidup di dunia yang berubah menjadi cerita.',
                'price' => 80000,
                'stock' => 40,
                'cover_foto' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdObReHiS7_sB2T0RGY_AIqRAMMHPyoeUWykA7yCCNjQ&s=10',
                'genre_id' => 4,
                'author_id' => 5,
            ],
            [
                'title' => 'The Lord of the Rings',
                'description' => 'Perjalanan membawa One Ring ke Mount Doom.',
                'price' => 95000,
                'stock' => 15,
                'cover_foto' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMBdja7Esm2iXS_2tYWpGQD1ymXyCalM0xcKbd72hzUbco653V6ZRZhCz&s=10',
                'genre_id' => 1,
                'author_id' => 8,
            ],
            [
                'title' => 'Shadow Slave',
                'description' => 'Sunny bertahan hidup di dunia penuh Nightmare Spell.',
                'price' => 88000,
                'stock' => 30,
                'cover_foto' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlshXmgGakugQ5ahWcRYFAbf9hbXcqrqRJ0uCYFNLZVYrI4hAB9KcIvI0&s=10',
                'genre_id' => 4,
                'author_id' => 7,
            ],
        ];

        foreach ($books as $book) {
            DB::table('books')->updateOrInsert(
                ['title' => $book['title']],
                $book
            );
        }

        $existingBookCovers = [
            [
                'title' => 'Harry Potter',
                'cover_foto' => 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1598823299i/42844155.jpg',
            ],
            [
                'title' => 'Lord of the Rings',
                'cover_foto' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMBdja7Esm2iXS_2tYWpGQD1ymXyCalM0xcKbd72hzUbco653V6ZRZhCz&s=10',
            ],
            [
                'title' => '1984',
                'cover_foto' => 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/b468d093312907.5e6139cf2ab03.png',
            ],
            [
                'title' => 'The Hitchhiker\'s Guide to the Galaxy',
                'cover_foto' => 'https://ik.imagekit.io/panmac/tr:w-3840,pr-true,f-auto/bcd02f72-b50c-0179-8b4b-5e44f5340bd4/0731ccbe-23bb-43a5-9e0e-9a33fbc9213f/hitchhikers-guide-to-the-galaxy-42nd-anniversary-cover.jpg',
            ],
            [
                'title' => 'The Hobbit',
                'cover_foto' => 'https://d3ddkgxe55ca6c.cloudfront.net/assets/t1496538667/a/af/64/147470-ml-1141823.jpg',
            ],
        ];

        foreach ($existingBookCovers as $bookCover) {
            DB::table('books')
                ->where('title', $bookCover['title'])
                ->update(['cover_foto' => $bookCover['cover_foto']]);
        }
    }
}
