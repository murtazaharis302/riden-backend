<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        Blog::create([
            'title' => 'Revolutionizing Business with AI',
            'slug' => Str::slug('Revolutionizing Business with AI'),
            'category' => 'AI & Machine Learning',
            'image' => 'https://via.placeholder.com/640x480.png/00eeff?text=AI+Blog',
            'short_description' => 'Discover how Riden is using AI to transform modern enterprises.',
            'content' => 'Full blog content for AI transformation goes here...',
            'published_at' => now(),
            'is_featured' => true,
            'status' => 'published',
        ]);

        Blog::create([
            'title' => 'The Future of Web Development',
            'slug' => Str::slug('The Future of Web Development'),
            'category' => 'Web Development',
            'image' => 'https://via.placeholder.com/640x480.png/0044ff?text=Web+Blog',
            'short_description' => 'Latest trends in Next.js and Laravel integration.',
            'content' => 'Deep dive into full-stack development...',
            'published_at' => now(),
            'is_featured' => false,
            'status' => 'published',
        ]);
    }
}