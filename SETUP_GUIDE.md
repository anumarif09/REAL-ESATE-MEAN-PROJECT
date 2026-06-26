# Real Estate Platform - Angular Frontend & Backend Integration Guide

## 📋 Project Overview

This is a complete Real Estate Marketplace System with:
- **Backend**: Node.js + Express + MongoDB with JWT authentication
- **Frontend**: Angular 21 with standalone components, routing, and HTTP interceptors

## ✅ Backend Status

Your backend is **production-ready**! Here's what's configured:

### API Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Properties**: `/api/properties` (CRUD operations)
- **Messages**: `/api/messages`
- **Purchases**: `/api/purchase`
- **Buy Requests**: `/api/buy-requests`
- **Services**: `/api/service`
- **Contact**: `/api/contact`

### Features
- ✅ JWT authentication with bcrypt password hashing
- ✅ Role-based access (buyer/seller)
- ✅ CORS configured for Angular dev server
- ✅ Error handling with express-async-errors
- ✅ MongoDB connection with proper configuration

## 🎨 Frontend - Newly Created Components

### Architecture
```
src/app/
├── auth/
│   ├── login/
│   ├── register/
├── properties/
│   ├── property-list/
│   ├── property-detail/
├── dashboard/
│   ├── seller-dashboard/
├── home/
├── models/
│   ├── user.ts
│   ├── property.ts
│   ├── api-response.ts
├── services/
│   ├── auth.service.ts
│   ├── property.service.ts
├── interceptors/
│   ├── jwt.interceptor.ts
│   ├── error.interceptor.ts
│   ├── auth.guard.ts
├── shared/
│   ├── navbar/
```

### Key Features Implemented

#### 1. **Authentication**
- Login & Register pages with form validation
- JWT token management
- Local storage for user persistence
- Auth guard for protected routes

#### 2. **Property Management**
- Browse all properties (public view)
- Property detail page with image gallery
- Seller dashboard to add/manage properties
- Property search functionality (ready for filters)

#### 3. **HTTP Interceptors**
- **JWT Interceptor**: Automatically adds Authorization header
- **Error Interceptor**: Handles 401 errors and redirects to login
- **Auth Guard**: Protects routes based on user role

#### 4. **Responsive Design**
- Mobile-friendly UI
- Material Design-inspired styling
- Smooth animations and transitions

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB running locally or Atlas connection

### Backend Setup

```bash
cd "real estate backend"

# Create .env file
touch .env
# Add these variables:
# MONGO_URI=mongodb://localhost:27017
# JWT_SECRET=your_secret_key_here
# JWT_EXPIRES_IN=7d
# PORT=5000

npm install
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd angular-frontend

# Install dependencies
npm install

# Start development server
npm start
# App runs on http://localhost:4200
```

## 🔌 Integration Checklist

### Step 1: Verify Backend is Running
```bash
# Terminal 1
cd "real estate backend"
npm run dev
```

Check: http://localhost:5000 (should show "API running...")

### Step 2: Start Angular Frontend
```bash
# Terminal 2
cd angular-frontend
npm start
```

Check: http://localhost:4200 (should show home page)

### Step 3: Test Authentication
1. Click "Register"
2. Create a seller account
3. Login with credentials
4. Verify token is stored in localStorage

### Step 4: Test Property Features
1. Add a property from seller dashboard
2. Browse properties from home page
3. Click on a property to see details

## 🔐 API Integration Points

### Login/Register
```typescript
// AuthService automatically handles token storage
authService.login({ email, password }).subscribe(...);
authService.register({ name, email, password, role }).subscribe(...);
```

### Fetching Properties
```typescript
// PropertyService uses JWT interceptor automatically
propertyService.getAllProperties().subscribe(response => {
  // response.properties contains all listings
});
```

### Creating Property (Seller Only)
```typescript
// Requires JWT token and seller role
propertyService.createProperty(propertyData).subscribe(...);
```

## 🛠️ Environment Configuration

### Angular
- **API URL**: `http://localhost:5000`
- **Dev Server**: `http://localhost:4200`
- **CORS**: Already configured on backend

### Update API URL if needed
Modify in service files:
- [auth.service.ts](src/app/services/auth.service.ts#L12)
- [property.service.ts](src/app/services/property.service.ts#L11)

## 📝 Available Routes

| Route | Component | Auth Required | Role |
|-------|-----------|---------------|------|
| `/` | Home | No | All |
| `/login` | Login | No | All |
| `/register` | Register | No | All |
| `/properties` | Property List | No | All |
| `/properties/:id` | Property Detail | No | All |
| `/dashboard` | Seller Dashboard | **Yes** | **Seller** |

## 🔄 User Flows

### Buyer Flow
1. Register/Login
2. Browse properties
3. View property details
4. Contact seller (feature ready)
5. Make offer (feature ready)

### Seller Flow
1. Register as seller
2. Login
3. Go to Dashboard
4. Add property with details
5. Manage properties (edit/delete)
6. Receive messages from buyers

## 🎯 Next Steps (Optional Enhancements)

1. **Add Property Filters**
   - By price range
   - By location
   - By bedrooms/bathrooms

2. **Messaging System**
   - Real-time chat between buyer/seller
   - Message notifications

3. **Payment Integration**
   - Stripe/PayPal for offers
   - Transaction history

4. **Image Upload**
   - Replace image URL input with file upload
   - S3/Cloudinary integration

5. **Admin Dashboard**
   - Manage users
   - Monitor transactions
   - Analytics

## 🐛 Troubleshooting

### CORS Error
- Ensure backend is running on port 5000
- Check CORS configuration in [server.js](../real%20estate%20backend/server.js#L22)

### 401 Unauthorized
- Check if token is in localStorage
- Login again to refresh token
- Verify JWT_SECRET matches in backend

### Properties not loading
- Ensure MongoDB is connected
- Check backend console for errors
- Verify API endpoint URL in services

### Page not routing
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check routes in [app.routes.ts](src/app/app.routes.ts)

## 📞 Support

For issues with:
- **Backend**: Check `real estate backend` folder
- **Frontend**: Check `angular-frontend` folder
- **Integration**: Verify endpoints match in both projects
