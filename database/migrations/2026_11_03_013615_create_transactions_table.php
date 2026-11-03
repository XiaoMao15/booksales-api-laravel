<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('transactions')) {
            Schema::create('transactions', function (Blueprint $table) {
                $table->id();
                $table->string('order_number', 50)->unique();
                $table->foreignId('customer_id')
                    ->constrained('users')
                    ->onDelete('cascade');
                $table->foreignId('book_id')
                    ->constrained('books')
                    ->onDelete('cascade');
                $table->decimal('total_amount', 10, 2);
            });
        }
    }

    public function down(): void
    {
        // Tabel yang sudah ada tidak dihapus agar data tetap aman.
    }
};
