# API Reference

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer" // or "seller"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

## Property Endpoints

### Get All Properties
**GET** `/properties`

Response:
```json
{
  "success": true,
  "properties": [
    {
      "_id": "prop_id",
      "title": "Beautiful House",
      "description": "...",
      "price": 500000,
      "location": "New York",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 2500,
      "images": ["url1", "url2"],
      "listedBy": {
        "_id": "seller_id",
        "name": "Seller Name",
        "email": "seller@example.com"
      },
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Property by ID
**GET** `/properties/:id`

Response:
```json
{
  "success": true,
  "property": { /* property object */ }
}
```

### Add Property (Seller Only)
**POST** `/properties`

Headers:
```
Authorization: Bearer <token>
```

Request:
```json
{
  "title": "Beautiful House",
  "description": "A spacious 3 bedroom house...",
  "price": 500000,
  "location": "New York",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 2500,
  "images": ["https://image1.jpg", "https://image2.jpg"]
}
```

Response:
```json
{
  "success": true,
  "property": { /* created property */ }
}
```

### Update Property (Seller Only)
**PUT** `/properties/:id`

Headers:
```
Authorization: Bearer <token>
```

Request:
```json
{
  "title": "Updated Title",
  "price": 550000
  /* other fields to update */
}
```

Response:
```json
{
  "success": true,
  "property": { /* updated property */ }
}
```

### Delete Property (Seller Only)
**DELETE** `/properties/:id`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "message": "Property deleted"
}
```

## Messages Endpoints

### Send Message
**POST** `/messages`

Headers:
```
Authorization: Bearer <token>
```

Request:
```json
{
  "recipient": "recipient_user_id",
  "content": "Are you interested in this property?"
}
```

### Get Messages
**GET** `/messages`

Headers:
```
Authorization: Bearer <token>
```

## Purchase Endpoints

### Create Purchase Request
**POST** `/purchase`

Headers:
```
Authorization: Bearer <token>
```

Request:
```json
{
  "propertyId": "property_id",
  "offeredPrice": 480000,
  "message": "Interested in buying this property"
}
```

## Buy Request Endpoints

### Get All Buy Requests
**GET** `/buy-requests`

### Create Buy Request
**POST** `/buy-requests`

Headers:
```
Authorization: Bearer <token>
```

## Service Endpoints

### Get All Services
**GET** `/service`

### Add Service
**POST** `/service`

Headers:
```
Authorization: Bearer <token>
```

## Contact Endpoints

### Send Contact Message
**POST** `/contact`

Request:
```json
{
  "name": "John",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question..."
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Only sellers can add property"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Property not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```

## Authentication

All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

The token is automatically added by the JWT Interceptor in Angular.

## Common Use Cases

### Register as Seller
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Seller",
    "email": "seller@example.com",
    "password": "securepassword",
    "role": "seller"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@example.com",
    "password": "securepassword"
  }'
```

### Get All Properties
```bash
curl http://localhost:5000/api/properties
```

### Add Property (with token)
```bash
curl -X POST http://localhost:5000/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "New House",
    "description": "Beautiful property",
    "price": 400000,
    "location": "NYC",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 2000,
    "images": []
  }'
```
