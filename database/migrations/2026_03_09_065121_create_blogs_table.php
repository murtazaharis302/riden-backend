<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique(); // SEO friendly URL for Next.js
            $table->string('category');
            $table->string('image')->nullable(); // Image path or URL
            $table->text('short_description');
            $table->longText('content');
            $table->date('published_at');
            
            // Ye extra columns jo kaam aayenge:
            $table->boolean('is_featured')->default(false); // Home page pe dikhane ke liye
            $table->enum('status', ['draft', 'published'])->default('published'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
