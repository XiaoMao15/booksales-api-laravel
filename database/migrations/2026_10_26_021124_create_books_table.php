
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('books')) {
            Schema::create('books', function (Blueprint $table) {
                $table->id();
                $table->string('title', 255);
                $table->text('description')->nullable();
                $table->decimal('price', 10, 2);
                $table->integer('stock');
                $table->string('cover_foto', 255)->nullable();
                $table->integer('genre_id');
                $table->integer('author_id');

                $table->foreign('genre_id')
                    ->references('id_genre')->on('genre');

                $table->foreign('author_id')
                    ->references('id_author')->on('author');
            });
        }
    }

    public function down(): void
    {
    }
};
