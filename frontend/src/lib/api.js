// src/lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Fetch all blogs from the backend API
 */
export async function fetchBlogs() {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return await res.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Fetch a single blog by slug
 */
export async function fetchBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch blog');
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

/**
 * Submit a contact form inquiry
 */
export async function submitContact(data) {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to submit contact');
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Subscribe to the newsletter
 */
export async function subscribeNewsletter(email) {
  try {
    const res = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to subscribe');
    return { success: true, data: result };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch company settings (footer data, etc.)
 */
export async function fetchSettings() {
  try {
    const res = await fetch(`${API_URL}/settings`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}
