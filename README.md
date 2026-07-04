# 🛍️ ITech Ecommerce Platform

A complete full-stack e-commerce application for tech products built with **React**, **Node.js**, **Express**, and **MongoDB**. This platform provides a seamless shopping experience with admin management capabilities.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Key Components](#-key-components)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ITech Ecommerce Platform** is a modern, full-featured e-commerce solution designed to sell technology products. The platform serves both customers and administrators with distinct interfaces and functionalities.

### Key Highlights:
- 🛒 **Customer Dashboard**: Browse products, manage cart, place orders, and leave feedback
- 🔐 **Secure Authentication**: JWT-based authentication with Google OAuth support
- 👨‍💼 **Admin Panel**: Manage products, users, orders, and customer feedback
- 📱 **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- 🔔 **Real-time Notifications**: Toast notifications for user actions
- 💳 **Order Management**: Complete order lifecycle tracking
- ⭐ **Customer Reviews**: Leave and manage product feedback

---

## ✨ Features

### For Customers:
- ✅ User registration and secure login
- ✅ Google OAuth authentication
- ✅ Browse and search products
- ✅ Add products to cart
- ✅ Checkout and place orders
- ✅ View order history
- ✅ Leave product reviews and feedback
- ✅ Password reset functionality
- ✅ User profile management
- ✅ Mobile-optimized interface

### For Administrators:
- ✅ Dashboard overview and analytics
- ✅ Product management (Create, Read, Update, Delete)
- ✅ User management
- ✅ Order tracking and management
- ✅ Customer feedback review
- ✅ Order status updates

---

## 📸 Screenshots

> Screenshots will be added here to showcase:
> - Landing page and product catalog
> - Login and registration flow
> - Shopping cart and checkout process
> - Customer dashboard and order history
> - Admin panel and management interface
> - Mobile responsive views

*[Add your screenshots here]*

---

## 🛠️ Tech Stack

### Frontend:
- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Google OAuth** - Social authentication
- **Supabase JS** - Backend as a service

### Backend:
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment:
- **Frontend**: Vercel
- **Backend**: Node.js server
- **Database**: MongoDB

---

## 📁 Project Structure

```
itech-ecommerce-platform/
│
├── frontend/                          # React + Vite frontend
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── header.jsx
│   │   │   ├── productCard.jsx
│   │   │   ├── bottomNavigationBar.jsx
│   │   │   ├── createOrderModel.jsx
│   │   │   ├── customerFeedBackModal.jsx
│   │   │   ├── orderDataModel.jsx
│   │   │   └── [other modals and components]
│   │   ├── pages/                    # Page components
│   │   │   ├── homePage.jsx
│   │   │   ├── landingPage.jsx
│   │   │   ├── loginPage.jsx
│   │   │   ├── registerPage.jsx
│   │   │   ├── cartPage.jsx
│   │   │   ├── checkoutPage.jsx
│   │   │   ├── customerMyOrdersPage.jsx
│   │   │   ├── adminPage.jsx
│   │   │   ├── overviewPage.jsx
│   │   │   ├── settingsPage.jsx
│   │   │   ├── forgetPassword.jsx
│   │   │   ├── privacyPolicyPage.jsx
│   │   │   └── [other pages]
│   │   ├── assets/                   # Images and static files
│   │   ├── utils/                    # Utility functions
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── main.jsx                  # Vite entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static files
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json                   # Vercel deployment config
│   └── tailwind.config.js
│
├── backend/                          # Express.js backend
│   ├── controllers/                  # Business logic
│   │   ├── userController.js         # User authentication & management
│   │   ├── productController.js      # Product CRUD operations
│   │   ├── orderController.js        # Order management
│   │   ├── feedBackController.js     # Customer feedback handling
│   │   └── studentController.js
│   ├── models/                       # MongoDB schemas
│   │   ├── user.js                   # User schema
│   │   ├── product.js                # Product schema
│   │   ├── order.js                  # Order schema
│   │   ├── feedBack.js               # Feedback schema
│   │   ├── otp.js                    # OTP for password reset
│   │   └── student.js
│   ├── routers/                      # Route definitions
│   │   ├── userRouter.js             # User routes
│   │   ├── productRouter.js          # Product routes
│   │   ├── orderRouter.js            # Order routes
│   │   ├── feedBackRouter.js         # Feedback routes
│   │   └── studentRouter.js
│   ├── middlewares/                  # Express middlewares
│   │   └── authenticate.js           # JWT authentication middleware
│   ├── index.js                      # Express app entry point
│   ├── package.json
│   └── .env                          # Environment variables (not in repo)
│
└── README.md                         # This file

```

---

## 🚀 Installation & Setup

### Prerequisites:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)
- Google OAuth credentials

### Backend Setup:

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend directory:**
   ```env
   MONGO_URL=mongodb+srv://your_username:your_password@cluster.mongodb.net/itech-ecommerce
   JWT_SECRET_KEY=your_super_secret_jwt_key_here
   PORT=3000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3000`

### Frontend Setup:

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 💻 Usage

### Running the Application:

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### User Flows:

**Customer Flow:**
- Sign up or login (via email or Google OAuth)
- Browse products on landing/home page
- Add products to cart
- Proceed to checkout
- Place order
- View order history
- Leave product feedback/reviews

**Admin Flow:**
- Login with admin credentials
- Access admin dashboard
- Manage products (create, edit, delete)
- View and manage users
- Track and update orders
- Review customer feedback

---

## 🔌 API Endpoints

### User Routes (`/api/users`):
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Password reset request
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Product Routes (`/api/products`):
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Routes (`/api/orders`):
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (Admin)
- `DELETE /api/orders/:id` - Cancel order

### Feedback Routes (`/api/feedback`):
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback
- `DELETE /api/feedback/:id` - Delete feedback (Admin)

---

## 🎨 Key Components

### Frontend Components:
- **Header** - Navigation bar with user menu
- **ProductCard** - Individual product display
- **CreateOrderModal** - Order creation dialog
- **CustomerFeedBackModal** - Feedback submission form
- **OrderDataModel** - Order details display
- **MobileSideBar** - Mobile navigation menu
- **BottomNavigationBar** - Mobile footer navigation

### Backend Controllers:
- **userController** - Handles authentication, registration, password reset
- **productController** - Manages product operations
- **orderController** - Manages order creation and updates
- **feedBackController** - Manages customer feedback
- **authenticateUser** - JWT middleware for protected routes

---

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** for authentication:

1. User logs in with email/password or Google OAuth
2. Backend generates JWT token
3. Token is stored in browser (localStorage)
4. Token is sent with every API request in Authorization header: `Bearer <token>`
5. Backend middleware validates token before processing request

---

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the ISC License.

---

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy Shopping! 🎉**
