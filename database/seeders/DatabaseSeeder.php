<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a default user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@ritovex.com',
        ]);

        // Run Blog Seeder
        $this->call(BlogSeeder::class);

        // Seed Company Settings
        \App\Models\CompanySetting::create(['key' => 'address', 'value' => '123 Creative Street, Tech City, Pakistan']);
        \App\Models\CompanySetting::create(['key' => 'email', 'value' => 'contact@ritovex.com']);
        \App\Models\CompanySetting::create(['key' => 'phone', 'value' => '+92 312 3456789']);
        \App\Models\CompanySetting::create(['key' => 'facebook_url', 'value' => 'https://facebook.com/ritovex']);
        \App\Models\CompanySetting::create(['key' => 'footer_description', 'value' => 'Innovative Agency delivering premium digital solutions globally.']);
    }
}
