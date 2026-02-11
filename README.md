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
1. Navigate to `web_ass_3-main/`.
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

## Setup Instructions (Detailed)

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
   The server runs on `http://localhost:8080` (or your Render URL in production).

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd "web_ass_3-main"
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

## 7. Development History (Detailed Development Process)

We built this project incrementally, moving from backend setup to the user interface. Here is how it went:

### Part 1: Backend Development (Node.js + Express + MongoDB)

**Step 1.1: Initialization and Basic Setup**
1.  Created the `node-js-auth` folder and initialized the project: `npm init -y`.
2.  Installed necessary packages:
    *   `express`: To create the server.
    *   `mongoose`: To work with the MongoDB database.
    *   `cors`: To allow requests from the frontend (cross-origin).
    *   `jsonwebtoken`: For authorization tokens.
    *   `bcryptjs`: For password hashing.
3.  Created `server.js` — the application entry point. Here we connected `express`, configured `cors`, and started the server on port 8080.

**Step 1.2: Database Connection (MongoDB Atlas)**
1.  Created a cluster in MongoDB Atlas.
2.  Configured the connection string in `app/config/db.config.js` (or via `.env`).
3.  Initialized `mongoose` and connected data models in `app/models/index.js`.

**Step 1.3: Data Models (Schema Design)**
We defined the data structure in the `app/models/` folder:
1.  `user.model.js`: User schema (name, email, password, role references, cart).
2.  `role.model.js`: Role schema (`user`, `admin`).
3.  `product.model.js` (optional): For storing products in the DB.

**Step 1.4: Authentication & Security**
This was the most complex part of the backend:
1.  **Controllers (`app/controllers/auth.controller.js`)**:
    *   `signup`: Checks if the user exists, hashes the password via `bcrypt`, saves the user, and assigns a role.
    *   `signin`: Finds the user, verifies the password, generates a JWT token valid for 24 hours.
2.  **Middleware (`app/middlewares/`)**:
    *   `authJwt.js`: Checks for the token in headers, decodes it, and verifies access rights (isAdmin).
    *   `verifySignUp.js`: Checks if the email or username is already taken during registration.
3.  **Routes (`app/routes/auth.routes.js`)**: Defined endpoints `POST /api/auth/signup` and `POST /api/auth/signin`.

**Step 1.5: User Functionality and API**
1.  Implemented `app/controllers/user.controller.js` to separate access:
    *   Public access (for everyone).
    *   User access (requires token).
    *   Admin access.
2.  Configured `app/routes/user.routes.js`, connecting the `authJwt` middleware to protect routes.

---

### Part 2: Frontend Development (HTML + CSS + JS)

**Step 2.1: Structure and Design**
1.  Created folder structure in `web_ass_3`: `css/`, `js/`, `assets/`.
2.  Built HTML pages:
    *   `index.html`: Main page with promo blocks.
    *   `login.html` / `register.html`: Auth forms.
    *   `products.html` / `product-detail.html`: Catalog and product card.
    *   `cart.html` / `checkout.html`: Cart and checkout.
3.  Connected **Bootstrap 5** for the grid and components (navbar, cards, modals).

**Step 2.2: JavaScript Logic (Client-Side Logic)**
We separated logic into modules in the `js/` folder:

1.  **Authentication (`js/auth.js`)**:
    *   Wrote functions to submit login/register forms to `/api/auth/...`.
    *   On successful login, we save `accessToken` and user data to `localStorage`.
    *   Implemented "Is user logged in" check: changing "Login" buttons to "Profile/Logout" in the header.

2.  **Products and Catalog (`js/products.js`)**:
    *   Created an array of product objects (or fetch them from the server).
    *   Wrote a function for dynamic HTML generation of product cards.
    *   Implemented filtering by category and price.

3.  **Shopping Cart (`js/cart.js`)**:
    *   Using `localStorage` to store the array of selected items.
    *   Implemented functions: `addToCart(product)`, `removeFromCart(id)`, `updateQuantity()`.
    *   Calculating and displaying the total order amount.

4.  **Backend Interaction (`js/script.js`)**:
    *   Configured global event listeners.
    *   Linked "Buy" buttons to cart logic.
    *   Added token checks when trying to access protected pages (e.g., profile).

**Step 2.3: Final Integration**
1.  Started the server (`npm start` in the backend folder).
2.  Opened `index.html` via Live Server.
3.  Tested the full cycle: Registration -> Login -> Add item to cart -> Checkout -> Check data persistence.
