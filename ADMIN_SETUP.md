# Admin Dashboard Setup

This document describes the admin dashboard functionality that has been implemented for the gem site.

## Features Implemented

### 1. Admin Layout

- **File**: `src/components/admin/AdminLayout.jsx`
- Responsive sidebar navigation with mobile hamburger menu
- Top bar with user info and logout functionality
- Navigation to all admin sections

### 2. Product Management

- **File**: `src/pages/admin/ProductManagement.jsx`
- **Form**: `src/components/admin/ProductForm.jsx`
- Full CRUD operations for products
- Support for both gems and jewelry
- Image upload (multiple images + 360° view)
- Certificate upload (PDF)
- Dynamic specifications based on product type
- Search and filtering capabilities
- Pagination

### 3. Blog Management

- **File**: `src/pages/admin/BlogManagement.jsx`
- **Form**: `src/components/admin/BlogForm.jsx`
- Full CRUD operations for blog posts
- Rich text content support
- Featured image upload
- Tag management
- Search functionality
- Pagination

### 4. Dashboard Overview

- **File**: `src/pages/admin/AdminDashboard.jsx`
- Statistics cards showing totals
- Recent products and blogs
- Quick action links
- Real-time data from API

### 5. API Service

- **File**: `src/services/api.js`
- Centralized API service with all admin endpoints
- Authentication token handling
- Error handling
- File upload support

## API Endpoints

### Products

- `GET /api/products` - List products with pagination and filters
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Blogs

- `GET /api/content/blogs` - List blogs with pagination
- `POST /api/content/blogs` - Create new blog post
- `PUT /api/content/blogs/:id` - Update blog post
- `DELETE /api/content/blogs/:id` - Delete blog post

### File Upload

- `POST /api/upload` - Upload images and documents

## Routes

All admin routes are protected and require admin authentication:

- `/admin` - Dashboard overview
- `/admin/products` - Product management
- `/admin/blogs` - Blog management
- `/admin/inquiries` - Inquiry management (placeholder)
- `/admin/homepage` - Homepage management (placeholder)

## Authentication

- Uses Firebase authentication
- Admin routes protected with `ProtectedRoute` component
- Requires `isAdmin` flag on user object for admin access

## Environment Variables

Create a `.env` file with:

```
VITE_API_BASE_URL=http://localhost:3001/api
```

## Usage

1. Ensure your backend API is running on the configured URL
2. User must be authenticated and have admin privileges
3. Navigate to `/admin` to access the dashboard
4. Use the sidebar to navigate between different management sections

## Components Structure

```
src/
├── components/
│   └── admin/
│       ├── AdminLayout.jsx      # Main admin layout
│       ├── ProductForm.jsx      # Product create/edit form
│       ├── BlogForm.jsx         # Blog create/edit form
│       └── StatCard.jsx         # Dashboard statistics card
├── pages/
│   └── admin/
│       ├── AdminDashboard.jsx   # Main dashboard
│       ├── ProductManagement.jsx # Product list and management
│       ├── BlogManagement.jsx   # Blog list and management
│       ├── InquiryManagement.jsx # Inquiry management (placeholder)
│       └── HomepageManagement.jsx # Homepage management (placeholder)
└── services/
    └── api.js                   # API service
```

## Next Steps

1. Implement the backend API endpoints
2. Add user role management (admin flag)
3. Implement file upload functionality
4. Add more detailed inquiry management
5. Add homepage content management features
6. Add analytics and reporting features
