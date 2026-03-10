<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\CompanySettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Resource route for blogs CRUD
Route::apiResource('blogs', BlogController::class);

// Contact submission route
Route::post('/contact', [ContactController::class, 'store']);

// Newsletter subscription
Route::post('/newsletter', [NewsletterController::class, 'store']);

// Company/Footer settings
Route::get('/settings', [CompanySettingController::class, 'index']);
Route::post('/settings', [CompanySettingController::class, 'update']); // Using POST for easier form-data handling if needed
