# SafeTyres - E-Commerce Platform

A full-stack e-commerce platform for selling tire sealant products with customer reviews, admin dashboard, and order management.

![SafeTyres](./frontend/src/assets/logo.png)

---

## 🚀 Features

### Customer Features
- 🛒 **Product Catalog** - Browse tire sealant products with detailed information
- 🛍️ **Shopping Cart** - Add/remove products, adjust quantities
- 💳 **Secure Checkout** - Complete orders with customer contact information
- 📦 **Order Tracking** - View order history and track order status
- ⭐ **Customer Reviews** - Submit reviews with 5-star ratings (pending admin approval)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Admin Features
- 📊 **Dashboard** - Overview of sales, orders, users, and products
- 📦 **Product Management** - Create, edit, delete products
- 🛍️ **Order Management** - View all orders, update order status
- 👥 **User Management** - Manage users, change user roles
- ⭐ **Review Management** - Approve, reject, or delete customer reviews
- 🔐 **Role-Based Access Control** - Secure admin-only routes

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **React Hook Form** - Form validation
- **Zod** - Schema validation
- **Sonner** - Toast notifications

### Backend
- **Node.js** with Express
- **TypeScript** - Type safety
- **MongoDB** with Mongoose - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Express Rate Limit** - API rate limiting
- **Helmet** - Security headers
- **Morgan** - HTTP logging

---

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/aduith/SafeTyres.git
cd SafeTyres
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/safeTyres

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS
CORS_ORIGIN=http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:8080`

---

## 👤 Default Admin Account

After setting up the database, create an admin account:

**Email:** `admin@safeTyres.com`  
**Password:** `admin123`

You can create this account by:
1. Registering a new user at `/register`
2. Manually updating the user's role to `admin` in MongoDB

Or use MongoDB Compass/Shell:
```javascript
db.users.updateOne(
  { email: "admin@safeTyres.com" },
  { $set: { role: "admin" } }
)
```

---

## 📁 Project Structure

```
SafeTyres/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, error handling
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── server.ts        # Express app entry
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/          # Images, logos
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── AdminNavbar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── StarRating.tsx
│   │   │   └── ...
│   │   ├── contexts/        # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── CartContext.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin pages
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── ProductManagement.tsx
│   │   │   │   ├── OrderManagement.tsx
│   │   │   │   ├── UserManagement.tsx
│   │   │   │   └── ReviewManagement.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   └── ...
│   │   ├── services/        # API services
│   │   ├── validators/      # Zod schemas
│   │   └── App.tsx          # Main app component
│   ├── .env                 # Environment variables
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/all` - Get all orders (admin)
- `PUT /api/orders/:id` - Update order status (admin)

### Reviews
- `POST /api/reviews` - Submit review (public)
- `GET /api/reviews/approved` - Get approved reviews (public)
- `GET /api/reviews/all` - Get all reviews (admin)
- `PATCH /api/reviews/:id/status` - Update review status (admin)
- `DELETE /api/reviews/:id` - Delete review (admin)

### Users (Admin)
- `GET /api/users` - Get all users
- `PATCH /api/users/:id/role` - Update user role

### Analytics (Admin)
- `GET /api/analytics/dashboard` - Get dashboard statistics

---

## 🎯 Usage Guide

### For Customers

1. **Browse Products**
   - Visit homepage to see featured products
   - Navigate to Products page for full catalog

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - Adjust quantities in cart

3. **Checkout**
   - Click "Checkout" in cart
   - Fill in contact information
   - Confirm order

4. **Track Orders**
   - Login to your account
   - View "Order History"
   - Click on any order for details

5. **Submit Review**
   - Scroll to "Share Your Review" section on homepage
   - Fill name, email, select star rating (1-5)
   - Write your comment (max 500 characters)
   - Submit for admin approval

### For Admins

1. **Access Admin Panel**
   - Login with admin credentials
   - Automatically redirected to `/admin`

2. **Dashboard**
   - View total orders, revenue, users, products
   - See recent orders
   - Check order status distribution

3. **Manage Products**
   - Click "Products" in admin navbar
   - Add new products with image URLs
   - Edit existing products
   - Delete products

4. **Manage Orders**
   - Click "Orders" in admin navbar
   - Filter by status (pending/processing/shipped/delivered/cancelled)
   - Update order status
   - View customer details

5. **Manage Users**
   - Click "Users" in admin navbar
   - View all registered users
   - Change user roles (user ↔ admin)

6. **Manage Reviews**
   - Click "Reviews" in admin navbar
   - Filter by status (all/pending/approved/rejected)
   - Approve reviews to display on homepage
   - Reject or delete inappropriate reviews

---

## 🎨 Design Features

- **Modern UI** - Clean, professional design with Tailwind CSS
- **Dark Mode Ready** - Built with shadcn/ui theming
- **Animations** - Smooth transitions and hover effects
- **Responsive** - Mobile-first design approach
- **Accessible** - ARIA labels and semantic HTML

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Role-Based Access** - Admin middleware protection
- **Rate Limiting** - Prevent API abuse
- **CORS Protection** - Configured origins
- **Helmet Security** - HTTP security headers
- **Input Validation** - Zod schemas on frontend and backend

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

---

## 📦 Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

---

## 🌐 Deployment

### Backend Deployment (Example: Heroku)
1. Create a Heroku app
2. Set environment variables
3. Deploy:
```bash
git push heroku main
```

### Frontend Deployment (Example: Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aduith**
- GitHub: [@aduith](https://github.com/aduith)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [React](https://react.dev/) - UI library
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database

---

## 📞 Support

For support, email support@safeTyres.com or open an issue on GitHub.

---

## 🗺️ Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for orders
- [ ] Product image upload functionality
- [ ] Advanced search and filtering
- [ ] Wishlist feature
- [ ] Product recommendations
- [ ] Multi-language support
- [ ] Analytics dashboard enhancements

---

**Made with ❤️ for SafeTyres**
