<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'price',
        'stock',
        'cover_foto',
        'genre_id',
        'author_id',
    ];
}
