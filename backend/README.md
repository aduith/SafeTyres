# SafeTyres Backend API

Backend API for SafeTyres e-commerce platform built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB URI and other settings
```

### Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Production mode
npm start

# Seed database with initial data
npm run seed
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Product Routes

#### Get All Products
```http
GET /api/products
GET /api/products?popular=true
GET /api/products?size=300ml
```

#### Get Product by ID
```http
GET /api/products/:id
```

### Cart Routes

#### Get Cart
```http
GET /api/cart
X-Session-Id: <session-id>  // For guest users
Authorization: Bearer <token>  // For authenticated users
```

#### Add to Cart
```http
POST /api/cart
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 1
}
```

### Order Routes (Protected)

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "card"
}
```

#### Get Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

## 🔐 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safeTyres
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   ├── validators/      # Request validation
│   └── server.ts        # Entry point
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

## 🛡️ Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- JWT authentication
- Password hashing with bcrypt
- Input validation
- Error handling

## 👤 Default Admin User

After running `npm run seed`:
- Email: admin@safeTyres.com
- Password: admin123

## 📝 License

ISC
