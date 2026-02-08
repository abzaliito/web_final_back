# ElectroStore - Final Web Project

## 1. Project Overview
**Topic**: E-Commerce Web Application (ElectroStore).
**Description**: A full-stack web application for browsing and purchasing electronics. It features user authentication, a product catalog with filters, a shopping cart, and order management. Built with **Node.js, Express, MongoDB** (Backend) and **HTML5, Bootstrap 5, Vanilla JS** (Frontend).

## 2. Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account (or local MongoDB)

### Backend Setup
1. Navigate to `node-js-auth/`:
   ```bash
   cd node-js-auth
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `node-js-auth/` with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=8080
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to `web_ass_3-main (1)/web_ass_3-main/`.
2. Open `index.html` in any modern browser (or use VS Code Live Server).

## 3. API Documentation

### Authentication (Public)
- **POST /api/auth/signup**: Register a new user.
  - Body: `{ username, email, password }`
- **POST /api/auth/signin**: Login and get JWT.
  - Body: `{ username, password }`

### User Management (Private)
- **GET /api/users/profile**: Get current user profile.
- **PUT /api/users/profile**: Update profile details.

### Order Management (Private) -> *Second Collection*
- **POST /api/orders**: Create a new order.
  - Body: `{ products: [...], totalAmount: Number }`
- **GET /api/orders**: Get all orders for the current user.
- **GET /api/orders/:id**: Get a specific order by ID.
- **PUT /api/orders/:id**: Update an order (e.g., status).
- **DELETE /api/orders/:id**: Delete an order.

## 4. Features & Screenshots
*(Screenshots would be placed here in the repo)*

- **Authentication**: Secure Login/Register forms with Joi validation.
- **Catalog**: Filter products by category, price, and rating.
- **Shopping Cart**: Persistent cart using LocalStorage.
- **Checkout**: Order creation with Email Confirmation.
- **Responsive UI**: Fully responsive design using Bootstrap 5.

## 5. Technology Stack
- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt, Nodemailer, Joi.
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript (ES6+).
- **Database**: MongoDB Atlas.

## 6. Security & Validation
- **JWT**: Used for secure stateless authentication.
- **Bcrypt**: Passwords are hashed before storage.
- **Joi**: All incoming requests (Register, Order) are strictly validated.
- **RBAC**: Role-based middleware (User/Admin).

### Features
- **User Authentication**: Secure Registration and Login using JWT.
- **Product Catalog**: Browse products with categories and search (mock data/API).
- **Shopping Cart**: Add items, manage quantity, and persistent cart using LocalStorage.
- **Order Management**: Checkout process that submits orders to the backend.
- **Role-Based Access**: User and Admin roles (extensible).
- **Responsive Design**: Works on mobile and desktop.
- **Interactive Elements**: Theme toggler, animations, and dynamic content.

## Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB Atlas URI (or local MongoDB).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd node-js-auth
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in `node-js-auth/` with:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/electrostore_db
     JWT_SECRET=your_jwt_secret_key
     PORT=8080
     ```
   - *Note: Replace with your actual MongoDB URI.*

4. Start the Server:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd "web_ass_3-main (1)/web_ass_3-main"
   ```
2. Open `index.html` in your browser (or use Live Server).
3. Ensure the backend is running for Auth and Order features to work.

## API Documentation

### Authentication
- **POST /api/auth/signup**
  - Body: `{ username, email, password }`
  - Registers a new user.
- **POST /api/auth/signin**
  - Body: `{ username, password }`
  - Returns: `{ accessToken, id, username, email, roles }`

### Users
- **GET /api/users/profile**
  - Headers: `x-access-token: <token>`
  - Returns user profile data.

### Orders
- **POST /api/orders**
  - Headers: `x-access-token: <token>`
  - Body: `{ products: [...], totalAmount: Number, status: String }`
  - Creates a new order.
- **GET /api/orders**
  - Headers: `x-access-token: <token>`
  - Returns user's order history.

## Screenshots
*(Placeholders for actual screenshots)*
- **Home Page**: Hero section and featured products.
- **Catalog**: Product listing with filters.
- **Login/Register**: Secure auth forms.
- **Cart**: Managing items before checkout.
