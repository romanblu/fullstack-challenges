# Backend Documentation

## Overview

The backend is a Node.js/Express API server that provides RESTful endpoints for the TC Marketplace application. It handles user authentication, product management, shopping cart functionality, blog content, and integrates with MongoDB for data persistence and AWS S3 for file storage.

## Technology Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3 with CloudFront
- **Validation**: Joi schema validation
- **Password Hashing**: bcryptjs
- **Logging**: Winston logger
- **HTTP Logging**: Morgan (commented out)
- **Security**: Helmet, CORS, express-rate-limit
- **File Upload**: Multer with S3 integration
- **Development**: Nodemon for hot reloading

## Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── db.js              # MongoDB connection
│   └── multerConfig.js    # File upload configuration
├── logs/                  # Application logs
├── middleware/            # Express middleware
│   ├── auth.js            # JWT authentication middleware
│   ├── errorMiddleware.js # Error handling middleware
│   ├── session.js         # Session management
│   └── upload.js          # File upload middleware
├── modules/               # Feature modules (modular architecture)
│   ├── auth/              # Authentication module
│   ├── blog/              # Blog content module
│   ├── cart/              # Shopping cart module
│   ├── category/          # Product categories module
│   ├── inventory/         # Inventory management (placeholder)
│   ├── order/             # Order management (model only)
│   ├── payment/           # Payment processing (placeholder)
│   ├── product/           # Product management module
│   ├── store/             # Seller store module
│   ├── upload/            # File upload module
│   ├── user/              # User management module
│   └── variant/           # Product variants module
├── scripts/               # Database seeding and utility scripts
│   ├── categories.json    # Category data
│   ├── seedCategories.js  # Category seeding script
│   ├── seedData.js        # Sample data seeding script
│   └── exportData.js      # Data export script
├── utils/                 # Utility functions
│   ├── ApiError.js        # Custom error class
│   ├── asyncHandler.js    # Async route wrapper
│   ├── auth.js            # JWT utilities
│   ├── logger.js          # Winston logger configuration
│   └── slugGenHelper.js   # Slug generation utility
├── package.json           # Dependencies and scripts
├── server.js              # Main application entry point
└── .env                   # Environment variables (not committed)
```

## Module Architecture

Each feature module follows a consistent structure:

- **`module.controller.js`**: Route handlers with business logic
- **`module.model.js`**: Mongoose schema definitions
- **`module.routes.js`**: Express route definitions
- **`module.service.js`**: Business logic layer
- **`module.utils.js`**: Utility functions specific to the module
- **`module.validation.js`**: Input validation schemas (Joi)

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login

### Users (`/api/users`)
- `GET /` - List all users (admin)
- `POST /email/` - Find user by email
- `PUT /:id` - Update user (admin)
- `DELETE /:id` - Delete user (admin)

### Products (`/api/products`)
- `GET /` - List products with filtering
- `GET /featured` - Get featured products
- `GET /seller/:id` - Get products by seller
- `GET /:id` - Get single product
- `POST /` - Create product (seller only)
- `PUT /:id` - Update product (seller only)
- `DELETE /:id` - Delete product (seller only)

### Stores (`/api/store`)
- `GET /` - Get current seller's store
- `GET /:id` - Get store by ID
- `PUT /` - Update current seller's store
- `GET /products` - Get current seller's products

### Categories (`/api/categories`)
- `GET /` - List all categories
- `GET /tree` - Get category tree structure
- `POST /` - Create category
- `PATCH /:id` - Update category
- `DELETE /:id` - Delete category

### Cart (`/api/cart`)
- `GET /` - Get cart contents
- `POST /add` - Add item to cart
- `PATCH /items/:itemId` - Update cart item
- `DELETE /items/:itemId` - Remove cart item
- `POST /checkout` - Process checkout

### Blog (`/api/blog`)
- `GET /` - List blog posts
- `GET /my-posts` - Get current user's blog posts (seller)
- `GET /featured` - Get featured posts
- `GET /:slug` - Get blog post by slug
- `POST /` - Create blog post (seller)
- `PUT /:slug` - Update blog post (seller)
- `DELETE /:slug` - Delete blog post (seller)

### Variants (`/api/variants`)
- `GET /` - List all variants
- `POST /` - Create variant
- `PATCH /:id` - Update variant
- `DELETE /:id` - Delete variant

### Upload (`/api/upload`)
- `GET /presigned-url` - Get presigned URL for S3 upload

## Database Models

### User
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `role`: String (buyer/seller/admin)
- `phone`: String
- `store`: ObjectId (reference to Store, for sellers)

### Store
- `name`: String (required)
- `slug`: String (required, unique)
- `owner`: ObjectId (reference to User)
- `contactEmail`: String
- `contactPhone`: String
- `location`: String
- `description`: String
- `category`: String
- `profilePicture`: String (URL)

### Product
- `name`: String (required)
- `slug`: String (required, unique)
- `description`: String
- `price`: Number (required)
- `images`: Array of Strings (URLs)
- `category`: ObjectId (reference to Category)
- `seller`: ObjectId (reference to User)
- `variants`: Array of ObjectIds (references to Variant)
- `featured`: Boolean
- `inStock`: Boolean

### Category
- `name`: String (required)
- `slug`: String (required, unique)
- `description`: String
- `parent`: ObjectId (reference to Category, for hierarchical structure)

### Variant
- `name`: String (required)
- `type`: String (size, color, etc.)
- `value`: String
- `priceModifier`: Number

### BlogPost
- `title`: String (required)
- `slug`: String (required, unique)
- `content`: String (markdown)
- `excerpt`: String
- `author`: ObjectId (reference to User)
- `featured`: Boolean
- `publishedAt`: Date

### Cart (Session-based, not persisted)
- `items`: Array of cart items
- `total`: Number

## Authentication & Authorization

### JWT Authentication
- Tokens are signed with `JWT_SECRET`
- Default expiration: 7 days (configurable via `JWT_EXPIRES_IN`)
- Tokens include user ID, role, and store ID (for sellers)

### Middleware
- `protect`: Verifies JWT token in Authorization header
- `requireRole(role)`: Checks if user has specified role or admin privileges

### Roles
- **buyer**: Can browse products, manage cart, place orders
- **seller**: All buyer permissions + create/manage products, store, blog posts
- **admin**: All permissions including user management

## File Upload

### AWS S3 Integration
- Uses `@aws-sdk/client-s3` for S3 operations
- Presigned URLs for secure client-side uploads
- Images stored in private S3 buckets, served via CloudFront

### Environment Variables Required
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`

## Error Handling

### Custom Error Class
- `ApiError` class for consistent error responses
- HTTP status codes and error messages

### Global Error Middleware
- Catches all errors and returns appropriate responses
- Logs errors using Winston

## Logging

### Winston Logger
- Configured in `utils/logger.js`
- Multiple log levels: error, warn, info, debug
- HTTP request logging via Morgan (currently commented out)

## Data Seeding

### Scripts
- `npm run seed:categories` - Load category tree from `categories.json`
- `npm run seed:data` - Generate sample users, products, stores, blog posts
- `npm run export:data` - Export current database data

### Faker.js
Used in seeding scripts to generate realistic sample data.

## Security Features

- **Helmet**: Sets security headers
- **CORS**: Configured for frontend origin (`http://localhost:5173`)
- **Rate Limiting**: Express rate limit middleware
- **Input Validation**: Joi schemas for all inputs
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication tokens

## Development

### Scripts
- `npm run dev` - Start with nodemon (hot reload)
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables
Create a `.env` file with:
```
MONGO_URI=mongodb://localhost:27017/tc-marketplace
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
PORT=5000
```

## API Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": [ ... ] // optional
}
```

## Contributing

When adding new modules:
1. Follow the established module structure
2. Use asyncHandler for route controllers
3. Implement proper validation with Joi
4. Add comprehensive error handling
5. Update this documentation
6. Write tests (when test framework is added)

## Performance Considerations

- Database indexing on frequently queried fields
- Image optimization through CloudFront
- Rate limiting to prevent abuse
- Efficient MongoDB queries with proper population
- Modular architecture for better code splitting