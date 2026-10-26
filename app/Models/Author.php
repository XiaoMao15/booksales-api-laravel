<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $table = 'author';

    protected $primaryKey = 'id_author';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'foto',
        'bio',
    ];
}
