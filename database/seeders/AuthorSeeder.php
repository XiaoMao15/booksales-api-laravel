<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        $authors = [
            [
                'name' => 'Cuttlefish That Loves Diving',
                'foto' => 'cuttlefish.jpg',
                'bio' => 'Penulis Lord of the Mysteries.',
            ],
            [
                'name' => 'Gu Zhen Ren',
                'foto' => 'gu_zhen_ren.jpg',
                'bio' => 'Penulis Reverend Insanity.',
            ],
            [
                'name' => 'sing N song',
                'foto' => 'singnsong.jpg',
                'bio' => 'Penulis Omniscient Readers Viewpoint.',
            ],
            [
                'name' => 'J.R.R. Tolkien',
                'foto' => 'tolkien.jpg',
                'bio' => 'Penulis The Lord of the Rings.',
            ],
            [
                'name' => 'Guiltythree',
                'foto' => 'guiltythree.jpg',
                'bio' => 'Penulis Shadow Slave.',
            ],
        ];

        foreach ($authors as $author) {
            DB::table('author')->updateOrInsert(
                ['name' => $author['name']],
                $author
            );
        }
    }
}
