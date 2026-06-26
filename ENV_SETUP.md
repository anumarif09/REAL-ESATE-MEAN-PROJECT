# Environment Configuration

## Backend (.env)

Create a `.env` file in the `real estate backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Frontend (Angular Environment)

The Angular frontend automatically configures:
- **API Base URL**: `http://localhost:5000`
- **Dev Server Port**: `4200`
- **CORS Origin**: Configured on backend to accept `http://localhost:5173` and `http://localhost:4200`

### To modify API URL

Edit the following files if your backend runs on a different URL:

1. [auth.service.ts](angular-frontend/src/app/services/auth.service.ts) - Line 12
2. [property.service.ts](angular-frontend/src/app/services/property.service.ts) - Line 10

Change:
```typescript
private apiUrl = 'http://localhost:5000/api/auth';
```

To:
```typescript
private apiUrl = 'http://your-api-url/api/auth';
```

## Running Both Services

### Terminal 1 - Backend
```bash
cd "real estate backend"
npm install
npm run dev
```
Backend runs on: **http://localhost:5000**

### Terminal 2 - Frontend
```bash
cd angular-frontend
npm install
npm start
```
Frontend runs on: **http://localhost:4200**

## Database Connection Verification

To verify MongoDB is connected:
1. Check backend console for: `"MongoDB connected"`
2. Try to register/login from the Angular app
3. Check MongoDB if user document was created

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:4200` (Angular dev server)
- `http://localhost:5173` (Vite dev server)

To add more origins, edit [server.js](real%20estate%20backend/server.js#L22):
```javascript
app.use(cors({ 
  origin: ["http://localhost:4200", "http://localhost:5173", "http://your-domain.com"],
  credentials: true 
}));
```

## Production Deployment

### Before deploying to production:

1. **Backend**
   - Set `NODE_ENV=production`
   - Use strong `JWT_SECRET` (generate with `crypto.randomBytes(32).toString('hex')`)
   - Use MongoDB Atlas instead of local
   - Set actual domain in CORS

2. **Frontend**
   - Build: `npm run build`
   - Update API URL to production backend
   - Configure environment files

3. **Security**
   - Add rate limiting
   - Add input validation
   - Enable HTTPS
   - Use environment variables for secrets
