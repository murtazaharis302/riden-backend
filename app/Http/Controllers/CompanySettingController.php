<?php

namespace App\Http\Controllers;

use App\Models\CompanySetting;
use Illuminate\Http\Request;

class CompanySettingController extends Controller
{
    /**
     * Display a listing of the settings.
     */
    public function index()
    {
        $settings = CompanySetting::pluck('value', 'key');
        return response()->json($settings);
    }

    /**
     * Update/Create multiple settings.
     */
    public function update(Request $request)
    {
        $settings = $request->all();

        foreach ($settings as $key => $value) {
            CompanySetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return response()->json([
            'message' => 'Settings updated successfully',
            'settings' => CompanySetting::pluck('value', 'key')
        ]);
    }
}
