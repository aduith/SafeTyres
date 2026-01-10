# SafeTyres E-Commerce Platform

A full-stack e-commerce platform for SafeTyres anti-puncture liquid products.

## 📁 Project Structure

```
safeTyres/
├── frontend/          # React + TypeScript + TailwindCSS
├── backend/           # Node.js + Express + MongoDB
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Setup Instructions

#### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB URI

# Seed database with initial products and admin user
npm run seed

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

#### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 🔐 Default Admin Credentials

After running `npm run seed`:
- **Email**: admin@safeTyres.com
- **Password**: admin123

## 📚 Documentation

- **Backend API Documentation**: See [backend/README.md](backend/README.md)
- **API Endpoints**: Full REST API with authentication, products, cart, and orders
- **Database Models**: User, Product, Cart, Order

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- TailwindCSS
- shadcn/ui
- React Router
- Vite

### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt

## 📦 Features

### Current Features
✅ User authentication (register/login)  
✅ Product catalog with 4 sizes (200ml, 300ml, 500ml, 1L)  
✅ Shopping cart management  
✅ Order processing  
✅ Admin panel capabilities  
✅ Responsive design  
✅ Dark theme UI  

### Planned Features
🔄 Payment integration (Stripe/PayPal)  
🔄 Email notifications  
🔄 Product reviews  
🔄 Admin dashboard UI  
🔄 Order tracking  

## 🔒 Security

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Rate limiting
- Input validation
- Helmet security headers

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id` - Update order status (admin)
- `DELETE /api/orders/:id` - Cancel order (protected)

## 🚀 Deployment

### Backend Deployment
Recommended platforms:
- Railway
- Render
- Heroku
- DigitalOcean

### Frontend Deployment
Recommended platforms:
- Vercel
- Netlify
- Cloudflare Pages

### Database
- MongoDB Atlas (recommended for production)

## 📄 License

ISC

## 👨‍💻 Development

```bash
# Backend development
cd backend
npm run dev

# Frontend development
cd frontend
npm run dev

# Build for production
cd backend && npm run build
cd frontend && npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

**Built with ❤️ for SafeTyres**
