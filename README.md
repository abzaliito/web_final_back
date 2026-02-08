mongodb://atlas-sql-696899cd8284483e4d0261ae-snfhbe.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin # ElectroStore - Final Web Project

## Project Overview
ElectroStore is a full-stack e-commerce web application. It features a responsive frontend built with Bootstrap 5 and vanilla JavaScript, and a robust RESTful backend built with Node.js, Express, and MongoDB.

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
