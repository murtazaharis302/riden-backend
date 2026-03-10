<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\CompanySettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('blogs', BlogController::class);


Route::post('/contact', [ContactController::class, 'store']);


Route::post('/newsletter', [NewsletterController::class, 'store']);


Route::get('/settings', [CompanySettingController::class, 'index']);
Route::post('/settings', [CompanySettingController::class, 'update']); // Using POST for easier form-data handling if needed
