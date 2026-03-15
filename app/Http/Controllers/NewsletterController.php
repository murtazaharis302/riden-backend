<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    /**
     * Store a newly created subscriber in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:newsletters,email',
        ]);

        $subscriber = Newsletter::create($validated);

        return response()->json([
            'message' => 'Subscribed successfully',
            'subscriber' => $subscriber
        ], 201);
    }
}
