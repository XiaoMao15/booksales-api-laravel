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
                'cover_foto' => 'lotm.jpg',
                'genre_id' => 1,
                'author_id' => 4,
            ],
            [
                'title' => 'Reverend Insanity',
                'description' => 'Perjalanan Fang Yuan mengejar keabadian.',
                'price' => 90000,
                'stock' => 20,
                'cover_foto' => 'reverend_insanity.jpg',
                'genre_id' => 1,
                'author_id' => 6,
            ],
            [
                'title' => 'Omniscient Reader\'s Viewpoint',
                'description' => 'Kim Dokja bertahan hidup di dunia yang berubah menjadi cerita.',
                'price' => 80000,
                'stock' => 40,
                'cover_foto' => 'orv.jpg',
                'genre_id' => 4,
                'author_id' => 5,
            ],
            [
                'title' => 'The Lord of the Rings',
                'description' => 'Perjalanan membawa One Ring ke Mount Doom.',
                'price' => 95000,
                'stock' => 15,
                'cover_foto' => 'tlor.jpg',
                'genre_id' => 1,
                'author_id' => 8,
            ],
            [
                'title' => 'Shadow Slave',
                'description' => 'Sunny bertahan hidup di dunia penuh Nightmare Spell.',
                'price' => 88000,
                'stock' => 30,
                'cover_foto' => 'shadow_slave.jpg',
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
    }
}
