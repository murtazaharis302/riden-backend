<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Blog::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
            'short_description' => 'required|string',
            'content' => 'required|string',
            'published_at' => 'required|date',
            'is_featured' => 'nullable', // Handle form-data string "true"/"1"
            'status' => 'nullable|in:draft,published',
        ]);

        // Fix for form-data boolean conversion
        $validated['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);
        $validated['status'] = $request->input('status', 'published');
        $validated['slug'] = Str::slug($validated['title']);

        // Ensure slug is unique
        $originalSlug = $validated['slug'];
        $count = 1;
        while (Blog::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $count++;
        }

        $blog = Blog::create($validated);

        return response()->json([
            'message' => 'Blog created successfully',
            'blog' => $blog
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return response()->json($blog);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'image' => 'nullable|string',
            'short_description' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'published_at' => 'sometimes|required|date',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
            
            // Ensure slug is unique if it changed
            if ($validated['slug'] !== $blog->slug) {
                $originalSlug = $validated['slug'];
                $count = 1;
                while (Blog::where('slug', $validated['slug'])->where('id', '!=', $blog->id)->exists()) {
                    $validated['slug'] = $originalSlug . '-' . $count++;
                }
            }
        }

        $blog->update($validated);

        return response()->json($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response()->json(null, 204);
    }
}
