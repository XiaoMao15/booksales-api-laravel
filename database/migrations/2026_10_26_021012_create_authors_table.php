
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('author')) {
            Schema::create('author', function (Blueprint $table) {
                $table->id('id_author');
                $table->string('name', 100);
                $table->string('foto', 255)->nullable();
                $table->text('bio')->nullable();
            });
        }
    }

    public function down(): void
    {

    }
};
