<div align="center">

# LuxeHaven - A Modern Fullstack (MERN) E-Commerce Platform

</div>


#### Project Result Screenshots:



_Shop Page_
![Screenshot 1](./frontend/public/shop.png)

_Login Page_
![Screenshot 1](./frontend/public/Login.png)

_Register Page_
![Screenshot 1](./frontend/public/Register.png)

_Cart🛒_
![Screenshot 1](./frontend/public/Cart.png)

_Product Detailed Page_
![Screenshot 1](./frontend/public/ProductDetailed.png)

- Scroll down for Admin related pages

<div align="center">

## Requirement Document

</div>

## Table of Contents

1. [Introduction](#1-introduction)
2. [User Features](#2-user-features)
3. [Requirements](#3-requirements)
4. [Admin Features](#4-admin-features)
5. [Tech Stacks](#5-tech-stacks)
6. [Conclusion](#6-conclusion)

## 1. Introduction

This requirement document outlines the features and tech stacks for the development of a top-notch MERN (MongoDB, Express, React, Node.js) E-Commerce website. The goal is to provide a seamless shopping experience for users and empower administrators with efficient management tools. The website will boast a stunning user interface, exceptional user experience, and a feature-rich admin dashboard.

## 2. User Features

### 2.1 User Authentication and Account Management

#### Regular User Access
- User registration at `/register` route
- Secure login at `/login` route using email and password
- Profile management and order history access
- Shopping cart and wishlist functionality
- Logout functionality for user account security

#### Admin Access
- Admin registration at `/register-admin` route
- Same login route as regular users (`/login`)
- Access to admin dashboard at `/admin/dashboard`
- Additional admin features:
  - Product Management (`/admin/productlist`)
  - Category Management (`/admin/categorylist`)
  - Order Management (`/admin/orderlist`)
  - User Management (`/admin/userlist`)

#### Authentication Features
- JWT-based authentication
- Secure password hashing
- Protected routes for authenticated users
- Special middleware for admin routes
- User session management

### 2.2 User Profile Management

- Users can edit their profiles, including name, email, profile picture(v2), and contact information(v2).
- Ability for users to change their login password.
- Detailed order history for users to track and re-order items.
- Wishlist feature for users to create, edit, and manage a list of desired products.

### 2.3 Shopping Features

- A dynamic and well-organized product catalog with advanced filtering and sorting options.
- Product details pages with high-resolution images, comprehensive descriptions, user reviews, and related product suggestions.
- User-friendly shopping cart with the capability to add, remove, and modify items.
- Streamlined and secure checkout process with multiple payment options.
- Integration with PayPal for seamless and secure transactions.
- Automated order confirmation emails and SMS notifications with tracking details(v2).
- The ability for users to leave detailed reviews and ratings for products.
- Product comparison functionality to assist users in making informed purchase decisions(v2).

### 2.4 Search and Navigation

- A powerful search engine to quickly find products.
- Advanced filtering and sorting options based on categories, prices, brands, and customer ratings.
- Featured and best-selling product showcase.
- "Recently Viewed Items" feature to allow users to revisit previously viewed products(v2).

### 2.5 Customer Support and Communication(v2)

- Real-time live chat support for user inquiries and assistance.
- Automated email notifications for order updates, promotions, and personalized recommendations.
- A comprehensive help center with FAQs, tutorials, and troubleshooting guides.
- User-friendly returns and refunds process.

### 2.6 User Engagement(v2)

- Newsletters and subscription options for users to receive updates and promotions.
- Utilization of AI-driven recommendations to suggest products tailored to individual user preferences.
- User reviews and ratings feature for contributions to product and seller reviews.
- Social sharing capability to enable users to share product links on social media platforms.

## 3. Requirements

To achieve our vision of creating a top-notch E-Commerce website, we have the following key requirements:

### 3.1 Functional Requirements

- **User and Admin Authentication**:

  - Regular user registration (`/register`)
  - Admin registration (`/register-admin`)
  - Secure login system with role-based access
  - JWT token-based authentication
  - Protected routes for both users and admins
  
- **Admin Dashboard and Management**:
  - Full admin control panel at `/admin/dashboard`
  - Product management interface
  - Category management system
  - Order tracking and management
  - User account management
  - Analytics and reporting tools

- **User Profile Management**:

  - Edit user profiles.
  - Track and re-order items from order history.
  - Wishlist management.

- **Shopping Features**:

  - Dynamic product catalog.
  - Product details with images, descriptions, and reviews.
  - Shopping cart and checkout process.
  - Integration with PayPal for payments.
  - Order confirmation and tracking.

- **Search and Navigation**:

  - Powerful search engine.
  - Advanced filtering and sorting.
  - Featured and best-selling products.
  - Recently viewed items.

- **Customer Support and Communication(v2)**:

  - Real-time chat support.
  - Automated email notifications.
  - Comprehensive help center.
  - Returns and refunds.

- **User Engagement**:

  - Newsletters and subscriptions(v2).
  - AI-driven product recommendations(v2).
  - User reviews and ratings.
  - Social sharing(v2).

- **Security and Privacy**:
  - Secure payment processing.
  - Data privacy and compliance.

### 3.2 Admin Dashboard Requirements

#### Authentication and Security
- Dedicated admin registration system (`/register-admin`)
- Secure admin authentication
- Role-based access control
- Protected admin routes with special middleware

#### Dashboard Features
- Comprehensive admin control panel (`/admin/dashboard`)
- Real-time sales and revenue monitoring
- User activity tracking and management
- Inventory control system

#### Management Interfaces
- Product Management (`/admin/productlist`):
  - Add, edit, delete products
  - Manage product images
  - Update product details
  
- Category Management (`/admin/categorylist`):
  - Create and manage categories
  - Category organization
  
- Order Management (`/admin/orderlist`):
  - Order tracking and updates
  - Delivery status management
  - Payment verification
  
- User Management (`/admin/userlist`):
  - User account overview
  - Access control
  - User status management

#### Analytics and Reporting
- Sales analytics dashboard
- Inventory tracking
- User behavior insights
- Revenue reports
- Performance metrics

## 4. Tech Stacks

### Frontend (Package Information)

- **React**: Frontend built with React for responsive and dynamic user interfaces.
- **React Router**: For managing routes and navigation.
- **Redux Toolkit**: State management and optimization.
- **RTK Query**: For making API requests to the backend.
- **PayPal Integration**: Handling secure payments.
- **ApexCharts**: Creating stunning charts and analytics.
- **TailwindCSS**: Styling and layout.

### Backend (Package Information)

- **Node.js and Express**: Building the backend server.
- **MongoDB**: Database for product, user, and order data.
- **Mongoose**: ODM for MongoDB interactions.
- **JWT (JSON Web Tokens)**: User authentication.
- **Multer**: Handling file uploads.
- **Express-Async-Handler**: Simplifying error handling in async routes.
- **Cookie Parser and CORS**: Managing cookies and handling cross-origin requests.

## 5. API Documentation

### Base URL

All API routes are prefixed with `/api/v1`

### Authentication Routes

Base path: `/api/v1/users`

| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | `/auth` | Public | Login user |
| POST | `/logout` | Public | Logout current user |
| POST | `/register-admin` | Public | Register a new admin |
| POST | `/` | Public | Register a new user |
| GET | `/profile` | Private | Get current user profile |
| PUT | `/profile` | Private | Update user profile |
| GET | `/` | Admin | Get all users |
| GET | `/:id` | Admin | Get user by ID |
| PUT | `/:id` | Admin | Update user |
| DELETE | `/:id` | Admin | Delete user |

### Product Routes

Base path: `/api/v1/products`

| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| GET | `/` | Public | Get all products (paginated) |
| POST | `/` | Admin | Create a product |
| GET | `/allProducts` | Public | Get all products (no pagination) |
| GET | `/top` | Public | Get top rated products |
| GET | `/new` | Public | Get new products |
| GET | `/:id` | Public | Get single product |
| PUT | `/:id` | Admin | Update product |
| DELETE | `/:id` | Admin | Delete product |
| POST | `/:id/reviews` | Private | Add product review |
| POST | `/filtered-products` | Public | Get filtered products |

### Category Routes

Base path: `/api/v1/category`

| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | `/` | Admin | Create category |
| GET | `/categories` | Public | List all categories |
| GET | `/:id` | Public | Get single category |
| PUT | `/:categoryId` | Admin | Update category |
| DELETE | `/:categoryId` | Admin | Delete category |

### Order Routes

Base path: `/api/v1/orders`

| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | `/` | Private | Create new order |
| GET | `/` | Admin | Get all orders |
| GET | `/mine` | Private | Get user's orders |
| GET | `/total-orders` | Public | Get total order count |
| GET | `/total-sales` | Public | Get total sales |
| GET | `/total-sales-by-date` | Public | Get sales by date |
| GET | `/:id` | Private | Get order by ID |
| PUT | `/:id/pay` | Private | Update order to paid |
| PUT | `/:id/deliver` | Admin | Mark order as delivered |

### Upload Routes

Base path: `/api/v1/upload`

| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | `/` | Private | Upload single image |

### Access Levels

- **Public**: Accessible by anyone
- **Private**: Requires user authentication
- **Admin**: Requires admin authentication

### Authentication

To access protected routes, include the JWT token in the cookie. The middleware will automatically validate the token.

#### Admin Access

Admin routes require both:
1. Valid JWT token
2. User account with `isAdmin: true`

### Error Responses

All error responses follow this format:
```json
{
    "message": "Error message here"
}
```

### Success Responses

Success responses typically include:
- Status code 200/201
- Requested data in JSON format
- Success message when applicable

### File Upload

- Supported formats: JPG, JPEG, PNG, WEBP
- Max file size: Determined by server configuration
- Files are stored in the `uploads/` directory
- Response includes the file path

## 6. Conclusion

This requirement document sets the bar for a top-notch MERN E-Commerce website. It aims to provide users with an outstanding shopping experience while empowering administrators with robust tools for efficient management. By incorporating modern technologies and an array of features, the website is poised to stand out in the competitive E-Commerce landscape.

##### Admin Pages

_All products_
![Screenshot 1](./frontend/public/Admin_AllProducts.png)

_All Orders_
![Screenshot 1](./frontend/public/Admin_allOrders.png)

