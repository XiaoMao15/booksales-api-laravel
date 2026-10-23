<?php

namespace App\Models;

class Author
{
    private array $authors = [
        [
            'id' => 1,
            'name' => 'Cuttlefish That Loves Diving',
            'biography' => 'Penulis Lord of the Mysteries'
        ],
        [
            'id' => 2,
            'name' => 'Gu Zhen Ren',
            'biography' => 'Penulis Reverend Insanity'
        ],
        [
            'id' => 3,
            'name' => 'singNsong',
            'biography' => "Penulis Omniscient Reader's Viewpoint"
        ],
        [
            'id' => 4,
            'name' => 'J. R. R. Tolkien',
            'biography' => 'Penulis The Lord of the Rings'
        ],
        [
            'id' => 5,
            'name' => 'Guiltythree',
            'biography' => 'Penulis Shadow Slave'
        ],
    ];

    public function getAuthors(): array
    {
        return $this->authors;
    }
}
