# Aalliyah Cake's Creation

Backend API for Aalliyah Cake's Creation bakery service.

## Features

- Product management
- Order processing
- RESTful API endpoints
- CORS enabled

## API Endpoints

### Products
- GET /api/products - List all products
- GET /api/products/:id - Get single product
- POST /api/products - Create new product

### Orders
- GET /api/orders - List all orders
- POST /api/orders - Create new order
- GET /api/orders/:id - Get single order
- PATCH /api/orders/:id/status - Update order status

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. For production:
   ```
   npm start
   ```