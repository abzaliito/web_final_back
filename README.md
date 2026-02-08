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

## 7. Полная история разработки (Detailed Development Process)

Мы строили этот проект поэтапно, двигаясь от настройки серверной части к интерфейсу пользователя. Вот как это было:

### Часть 1: Разработка Backend (Node.js + Express + MongoDB)

**Шаг 1.1: Инициализация и Базовая Настройка**
1.  Создали папку `node-js-auth` и инициализировали проект: `npm init -y`.
2.  Установили необходимые пакеты:
    *   `express`: Для создания сервера.
    *   `mongoose`: Для работы с базой данных MongoDB.
    *   `cors`: Для разрешения запросов с фронтенда (другого источника).
    *   `jsonwebtoken`: Для создания токенов авторизации.
    *   `bcryptjs`: Для хеширования паролей.
3.  Создали файл `server.js` — точка входа в приложение. Здесь мы подключили `express`, настроили `cors` и запустили сервер на порту 8080.

**Шаг 1.2: Подключение Базы Данных (MongoDB Atlas)**
1.  Создали кластер в MongoDB Atlas.
2.  В файле `app/config/db.config.js` (или через `.env`) настроили строку подключения.
3.  В `app/models/index.js` инициализировали `mongoose` и подключили модели данных.

**Шаг 1.3: Модели Данных (Schema Design)**
Мы определили структуру данных в папке `app/models/`:
1.  `user.model.js`: Схема пользователя (имя, email, пароль, ссылки на роли, корзина).
2.  `role.model.js`: Схема ролей (`user`, `admin`).
3.  `product.model.js` (опционально): Для хранения товаров в БД.

**Шаг 1.4: Аутентификация и Безопасность (Auth & Security)**
Это была самая сложная часть backend-а:
1.  **Контроллеры (`app/controllers/auth.controller.js`)**:
    *   `signup`: Проверяет, существует ли пользователь, хеширует пароль через `bcrypt`, сохраняет пользователя и присваивает роль.
    *   `signin`: Находит пользователя, проверяет пароль, генерирует JWT токен с сроком действия 24 часа.
2.  **Middleware (`app/middlewares/`)**:
    *   `authJwt.js`: Проверяет наличие токена в заголовках, декодирует его и проверяет права доступа (isAdmin).
    *   `verifySignUp.js`: Проверяет, не занят ли email или username при регистрации.
3.  **Роуты (`app/routes/auth.routes.js`)**: Определили endpoints `POST /api/auth/signup` и `POST /api/auth/signin`.

**Шаг 1.5: Функционал Пользователя и API**
1.  Реализовали `app/controllers/user.controller.js` для разделения доступа:
    *   Публичный доступ (для всех).
    *   Доступ для пользователей (требует токен).
    *   Доступ для админов.
2.  Настроили `app/routes/user.routes.js`, подключив middleware `authJwt` для защиты маршрутов.

---

### Часть 2: Разработка Frontend (HTML + CSS + JS)

**Шаг 2.1: Структура и Дизайн**
1.  Создали структуру папок в `web_ass_3`: `css/`, `js/`, `assets/`.
2.  Верстали страницы HTML:
    *   `index.html`: Главная страница с промо-блоками.
    *   `login.html` / `register.html`: Формы авторизации.
    *   `products.html` / `product-detail.html`: Каталог и карточка товара.
    *   `cart.html` / `checkout.html`: Корзина и оформление.
3.  Подключили **Bootstrap 5** для сетки и компонентов (навбар, карточки, модальные окна).

**Шаг 2.2: Логика JavaScript (Client-Side Logic)**
Мы разделили логику на модули в папке `js/`:

1.  **Аутентификация (`js/auth.js`)**:
    *   Написали функции для отправки форм входа/регистрации на `/api/auth/...`.
    *   При успешном входе сохраняем `accessToken` и данные пользователя в `localStorage`.
    *   Реализовали проверку "Залогинен ли пользователь": меняем кнопки "Вход" на "Профиль/Выход" в шапке.

2.  **Товары и Каталог (`js/products.js`)**:
    *   Создали массив объектов с данными товаров (или получаем их с сервера).
    *   Написали функцию динамической генерации HTML карточек товаров.
    *   Реализовали фильтрацию по категориям и цене.

3.  **Корзина (`js/cart.js`)**:
    *   Используем `localStorage` для хранения массива выбранных товаров.
    *   Реализовали функции: `addToCart(product)`, `removeFromCart(id)`, `updateQuantity()`.
    *   Считаем и отображаем итоговую сумму заказа.

4.  **Взаимодействие с Backend (`js/script.js`)**:
    *   Настроили глобальные обработчики событий.
    *   Связали кнопки "Купить" с логикой корзины.
    *   Сделали проверку токена при попытке зайти на защищенные страницы (например, профиль).

**Шаг 2.3: Финальная Интеграция**
1.  Запустили сервер (`npm start` в папке backend).
2.  Открыли `index.html` через Live Server.
3.  Протестировали полный цикл: Регистрация -> Вход -> Добавление товара в корзину -> Оформление заказа -> Проверка сохранения данных.

