<?php

namespace App\Models;

class Genre
{
    private array $genres = [
        [
            'id' => 1,
            'name' => 'Fantasy',
            'description' => 'Cerita dengan unsur sihir dan dunia imajinatif'
        ],
        [
            'id' => 2,
            'name' => 'Science Fiction',
            'description' => 'Cerita tentang sains dan teknologi masa depan'
        ],
        [
            'id' => 3,
            'name' => 'Romance',
            'description' => 'Cerita yang berfokus pada hubungan romantis'
        ],
        [
            'id' => 4,
            'name' => 'Mystery',
            'description' => 'Cerita tentang misteri dan pemecahan teka-teki'
        ],
        [
            'id' => 5,
            'name' => 'Horror',
            'description' => 'Cerita yang bertujuan menimbulkan rasa takut'
        ],
    ];

    public function getGenres(): array
    {
        return $this->genres;
    }
}
