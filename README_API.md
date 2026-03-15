# 🚀 Riden Backend API Documentation

This backend is professionally built using Laravel 12 and is ready for Next.js integration.

## 📌 Base URL
`http://localhost:8000/api`

---

### 🛠 How to Set Up (For Testing)
1.  **Extract** the ZIP folder.
2.  Run `composer install`.
3.  Copy `.env.example` to `.env` (if not already there) and set your DB credentials.
4.  Run `php artisan migrate:fresh --seed` (This will create the database and add test data).
5.  Run `php artisan serve`.

---

## 🛠 Features & Endpoints

### 1. Blog System (Full CRUD)
- **Endpoint**: `/blogs`
- **Methods**: `GET`, `POST`, `PUT`, `DELETE`
- **Rich Text Support**: The `content` field uses `longText` to support full HTML/Styled content.
- **Frontend Note**: Use `dangerouslySetInnerHTML` in Next.js for the detail page.

### 2. Contact Us
- **Endpoint**: `/contact` (Method: `POST`)
- **Fields**: `name`, `email`, `phone`, `budget`, `inquiry`.

### 3. Newsletter
- **Endpoint**: `/newsletter` (Method: `POST`)
- **Validation**: Includes unique email checks.

### 4. Dynamic Footer & Settings
- **Endpoint**: `/settings` (Method: `GET` / `POST`)
- **Key-Value Store**: Manage Address, Phone, Social Links, and Descriptions dynamically.

---

## 🧪 Testing Dashboard
A visual testing dashboard is available in the project root:
👉 `api_test_dashboard.html`

Open this file in your browser to test all APIs and view sample JavaScript implementation.

---

**Built by Antigravity AI**
*Ready for high-performance frontend integration.*
