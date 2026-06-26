# Quick Command Reference

## Backend Commands

### Setup & Install
```bash
cd "real estate backend"
npm install
```

### Development
```bash
npm run dev
```
- Runs with nodemon (auto-restart on changes)
- Server on: http://localhost:5000

### Production
```bash
npm start
```

### Create .env file
```bash
# Windows
echo. > .env

# Linux/Mac
touch .env
```

Edit `.env` with:
```
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
PORT=5000
```

## Frontend Commands

### Setup & Install
```bash
cd angular-frontend
npm install
```

### Development
```bash
npm start
```
- Runs on: http://localhost:4200
- Auto-reload on file changes

### Build
```bash
npm run build
```
- Creates production build in `dist/`

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

## MongoDB Commands

### Check if MongoDB is running
```bash
# Windows
netstat -an | findstr 27017

# Linux/Mac
lsof -i :27017
```

### Start MongoDB (local)
```bash
# Windows
mongod

# Linux/Mac
brew services start mongodb-community
```

### Access MongoDB CLI
```bash
mongo
# or newer versions:
mongosh
```

### Useful MongoDB queries
```bash
# Show all databases
show dbs

# Use specific database
use RealEstateDB

# Show collections
show collections

# Find all users
db.users.find()

# Find all properties
db.properties.find()

# Count documents
db.properties.countDocuments()
```

## Testing the Integration

### 1. Test Backend is Running
```bash
curl http://localhost:5000
# Should return: "API running..."
```

### 2. Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456",
    "role": "seller"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### 4. Test Get Properties
```bash
curl http://localhost:5000/api/properties
```

### 5. Test Add Property (replace TOKEN)
```bash
curl -X POST http://localhost:5000/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Test House",
    "description": "Beautiful test property",
    "price": 500000,
    "location": "New York",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 2500,
    "images": []
  }'
```

## File Navigation

### Backend Files
```bash
cd "real estate backend"
code .
```

### Frontend Files
```bash
cd angular-frontend
code .
```

## Environment Quick Links

### Ports
| Service | Port | URL |
|---------|------|-----|
| Backend | 5000 | http://localhost:5000 |
| Frontend | 4200 | http://localhost:4200 |
| MongoDB | 27017 | localhost:27017 |

### Important Files
```
Backend:
├── server.js (main entry)
├── routes/auth.js
├── controllers/authController.js
├── models/user.js
└── .env (create this)

Frontend:
├── src/main.ts (bootstrap)
├── src/app/app.routes.ts (routes)
├── src/app/services/auth.service.ts
├── src/app/services/property.service.ts
└── src/app/app.config.ts (config)
```

## Debugging

### Check Backend Logs
```bash
# Backend console should show:
# "MongoDB connected"
# "Server running on port 5000"
```

### Check Frontend Network (Browser)
1. Open DevTools (F12)
2. Go to Network tab
3. Make a request (register/login)
4. Check:
   - Status: 200/201
   - Response contains token
   - Token is in localStorage

### Clear Frontend Cache
```bash
# Browser cache
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

# LocalStorage in console
localStorage.clear()
```

### View Stored Token
```bash
# In browser console (F12):
localStorage.getItem('token')
localStorage.getItem('user')
```

## Useful Tools

### MongoDB Compass
- Visual MongoDB client
- Download: https://www.mongodb.com/products/compass
- Connect to: mongodb://localhost:27017

### Postman
- API testing tool
- Download: https://www.postman.com/downloads/
- Import requests for testing

### VS Code Extensions
- Angular Language Service
- Prettier - Code formatter
- REST Client - API testing
- Thunder Client - Alternative to Postman

## Git Commands (if using version control)

```bash
# Initialize repo
git init

# Add all files
git add .

# Commit changes
git commit -m "message"

# Push to remote
git push origin main
```

## Common Issues & Fixes

### Port already in use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (Linux/Mac)
kill -9 <PID>
```

### Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```bash
# Make sure backend CORS is configured correctly
# Check in server.js for CORS settings
# Restart backend server
```

### Token Expired
```bash
# Login again in the UI
# Or clear localStorage:
localStorage.clear()
# Then login again
```

## Performance Tips

### Frontend
```bash
# Build for production (optimized)
npm run build

# Check bundle size
npm run build -- --stats
```

### Backend
```bash
# Use production environment
NODE_ENV=production npm start

# Monitor with PM2
npm install -g pm2
pm2 start server.js --name "real-estate-api"
```

## Deployment Notes

### Prepare for Production

1. **Backend** 
   - Change JWT_SECRET to strong value
   - Set MONGO_URI to Atlas or prod database
   - Set NODE_ENV=production
   - Deploy to Heroku/AWS/DigitalOcean

2. **Frontend**
   - Build: `npm run build`
   - Update API URL to production backend
   - Deploy built files to Vercel/Netlify/S3

### Example Heroku Deploy

```bash
# Backend
cd "real estate backend"
heroku create your-app-name
git push heroku main

# Frontend
cd angular-frontend
npm run build
# Deploy dist/ to Netlify or Vercel
```
