# Database Verification Guide

## ✅ Your Database IS Working!

The backend successfully connected to MongoDB and the data is there. Here's how to verify:

## Quick Verification

### 1. **Check via API (Easiest)**

Open your browser and visit these URLs:

```
http://localhost:5000/health
→ Should show: {"status":"ok","message":"Server is running"}

http://localhost:5000/api/products
→ Should show 4 products with details
```

### 2. **Check via Frontend**

```
http://localhost:8080/products
→ Should display all 4 products from database
```

---

## What's in Your Database

### Products Collection
- **4 Products** seeded:
  - Tyre Anti-Puncture Liquid 200ml - $12.99
  - Tyre Anti-Puncture Liquid 300ml - $17.99 (Popular)
  - Tyre Anti-Puncture Liquid 500ml - $24.99 (Popular)
  - Tyre Anti-Puncture Liquid 1L - $39.99

### Users Collection
- **1 Admin User**:
  - Email: `admin@safeTyres.com`
  - Password: `admin123`
  - Role: admin

### Carts Collection
- Empty initially
- Will populate when users add items to cart

### Orders Collection
- Empty initially
- Will populate when users place orders

---

## How to View Database (Options)

### Option 1: MongoDB Compass (GUI - Recommended)
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `safeTyres`
4. Browse collections: products, users, carts, orders

### Option 2: MongoDB Shell
If you have MongoDB installed:
```bash
# Open MongoDB shell
mongo

# Or if using newer version
mongosh

# Switch to database
use safeTyres

# View products
db.products.find().pretty()

# View users
db.users.find().pretty()

# Count documents
db.products.countDocuments()
db.users.countDocuments()
```

### Option 3: Via Backend API (Current Method)
```bash
# Get all products
curl http://localhost:5000/api/products

# Login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@safeTyres.com\",\"password\":\"admin123\"}"
```

---

## Test the Complete Flow

### 1. **Register a New User**
```
Frontend: http://localhost:8080/register
- Name: Test User
- Email: test@example.com
- Password: Test123
```

### 2. **Add Products to Cart**
```
Frontend: http://localhost:8080/products
- Click "Add to Cart" on any product
- Check cart icon - should show count
```

### 3. **View Cart in Database**
After adding to cart, check:
```
API: http://localhost:5000/api/cart
(Need to be logged in)
```

### 4. **Place an Order**
```
Frontend: http://localhost:8080/checkout
- Fill shipping address
- Click "Place Order"
```

### 5. **View Order in Database**
After placing order, check:
```
API: http://localhost:5000/api/orders
(Need to be logged in)
```

---

## Troubleshooting

### "Cannot see data in database"

**Check 1: Is MongoDB running?**
```bash
# Windows - Check if MongoDB service is running
Get-Service -Name MongoDB

# Or check if mongod process is running
Get-Process mongod
```

**Check 2: Is backend connected?**
- Backend terminal should show: `✅ MongoDB Connected Successfully`
- If not, check `.env` file has correct `MONGO_URI`

**Check 3: Was seeding successful?**
- You should have seen this earlier:
  ```
  ✅ Database seeded successfully!
  📦 Created 4 products
  👤 Created admin user
  ```

**Check 4: Test API directly**
```bash
# Should return products
curl http://localhost:5000/api/products
```

---

## Database Connection String

Your backend is using:
```
MONGO_URI=mongodb://localhost:27017/safeTyres
```

Database name: `safeTyres`

---

## Re-seed Database (Only if needed)

If you want to reset and re-seed:

```bash
cd backend
npm run seed
```

This will:
- Clear existing products and users
- Create 4 new products
- Create admin user

**Note:** This will NOT delete carts or orders!

---

## Summary

✅ **Your database IS working!**
- Backend connects successfully
- Products are seeded (4 items)
- Admin user exists
- API returns data correctly

**To verify right now:**
1. Open browser
2. Go to: `http://localhost:5000/api/products`
3. You should see JSON with 4 products!

If you want a visual interface, install **MongoDB Compass** - it's free and makes browsing the database much easier!
