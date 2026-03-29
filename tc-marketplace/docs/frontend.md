# Frontend Documentation

## Overview

The frontend is a React application built with Vite, providing a user interface for the TC Marketplace. It includes features for browsing products, managing user accounts, shopping cart functionality, blog content, and seller dashboards.

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context (Auth, Cart) + React Query for server state
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Yup validation
- **Icons**: Heroicons, Lucide React
- **Rich Text Editor**: TipTap
- **HTTP Client**: Axios
- **Drag & Drop**: @dnd-kit
- **Markdown**: React Markdown with remark plugins

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   ├── shared/         # Shared components
│   │   └── ui/             # Basic UI components
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── useAuth.js
│   ├── features/           # Feature-specific components
│   │   ├── auth/           # Authentication components
│   │   ├── blog/           # Blog-related components
│   │   ├── cart/           # Cart components
│   │   ├── dashboard/      # Seller dashboard components
│   │   ├── ImageUploader/  # Image upload components
│   │   └── products/       # Product-related components
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.jsx
│   │   ├── useBlogPost.jsx
│   │   ├── useBlogPostEditor.jsx
│   │   ├── useBlogPosts.jsx
│   │   ├── useHomeData.js
│   │   └── useProduct.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductPage.jsx
│   │   ├── Blog.jsx
│   │   ├── SignIn.jsx
│   │   ├── Register.jsx
│   │   ├── CartManagement.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── SellerDashboardPage.jsx
│   │   └── ...
│   ├── services/           # API service functions
│   │   ├── apiClient.js
│   │   ├── auth.js
│   │   ├── product.js
│   │   ├── cart.js
│   │   └── ...
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Features

### Authentication & User Management
- User registration (buyer/seller)
- Login/logout functionality
- JWT token management
- Role-based access control
- Profile management

### Product Browsing & Shopping
- Product listing with filtering
- Product detail pages
- Shopping cart management
- Checkout process
- Category browsing

### Seller Dashboard
- Product management (CRUD)
- Store profile management
- Blog post creation
- Image upload functionality

### Blog System
- Blog post listing
- Rich text editor for content creation
- Markdown rendering
- Featured posts

### Image Upload
- Drag & drop image upload
- AWS S3 integration
- Presigned URL handling

## Routing Structure

The application uses React Router with the following routes:

- `/` - Home page
- `/shop` - Product shop
- `/product/:slug` - Individual product page
- `/blog` - Blog listing
- `/blog/:slug` - Individual blog post
- `/login` - Sign in page
- `/register` - User registration
- `/register-seller` - Seller registration
- `/dashboard` - Seller dashboard
- `/cart` - Shopping cart
- `/cart/checkout` - Checkout page
- `/contact` - Contact page
- `/about` - About page

## State Management

### Context Providers
- **AuthContext**: Manages user authentication state and provides login/logout functions
- **CartContext**: Manages shopping cart state with add/remove/update functionality

### React Query
Used for server state management:
- Product data fetching
- Blog posts
- User data
- Caching and synchronization

## API Integration

The frontend communicates with the backend API through service modules in `src/services/`:

- `apiClient.js` - Axios instance with base configuration
- `auth.js` - Authentication endpoints
- `product.js` - Product-related API calls
- `cart.js` - Cart operations
- `blog.js` - Blog content management
- `store.js` - Store/seller management
- `upload.js` - File upload utilities

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Component Structure**: Organized into layout, shared, and UI components
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables
- `VITE_API_URL` - Backend API base URL

### Key Dependencies
- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **React Query**: Data fetching and caching
- **React Router**: Client-side routing
- **TipTap**: Rich text editing
- **React Hook Form**: Form management
- **Yup**: Schema validation

## Component Architecture

### Layout Components
- `Navbar`: Navigation bar with user menu
- `Footer`: Site footer

### Feature Components
Organized by domain (auth, blog, cart, etc.) for better maintainability.

### Custom Hooks
Reusable logic extracted into custom hooks for data fetching and state management.

## Performance Considerations

- React Query for efficient data fetching and caching
- Lazy loading of components where appropriate
- Optimized images with AWS CloudFront
- Minimal bundle size with Vite's tree shaking

## Browser Support

Modern browsers with ES6+ support. Tested on:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

When adding new features:
1. Follow the existing folder structure
2. Use TypeScript for type safety (if applicable)
3. Add proper error handling
4. Update this documentation
5. Test across different screen sizes