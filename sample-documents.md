# Sample Documents for Jethalal Clothing Website

## Sample Product Documents

### Product 1: Premium Cotton T-Shirt
```json
{
  "_id": "ObjectId('...')",
  "name": "Premium Cotton T-Shirt - Classic White",
  "description": "Experience the comfort of 100% pure cotton with our classic white t-shirt. Perfect for casual outings and daily wear. Made with love by Jethalal Clothing, this t-shirt promises comfort that lasts all day. The soft fabric feels gentle on your skin while maintaining its shape wash after wash. Ideal for the whole family - from teenagers to adults.",
  "price": 599,
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colors": ["White", "Black", "Navy Blue"],
  "images": [
    "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
    "https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg"
  ],
  "stock": 50,
  "sku": "JETH-TSHIRT-001",
  "category": "T-Shirts",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Product 2: Formal Cotton Shirt
```json
{
  "_id": "ObjectId('...')",
  "name": "Formal Cotton Shirt - Business Blue",
  "description": "Elevate your professional wardrobe with our premium formal shirt. Crafted from the finest cotton blend, this shirt combines comfort with style. The tailored fit ensures you look sharp at every business meeting. Features include wrinkle-resistant fabric, perfect collar structure, and premium buttons. Trust Jethalal's quality for your important occasions.",
  "price": 1299,
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colors": ["Light Blue", "White", "Light Pink", "Light Gray"],
  "images": [
    "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
    "https://images.pexels.com/photos/1124462/pexels-photo-1124462.jpeg"
  ],
  "stock": 35,
  "sku": "JETH-SHIRT-002",
  "category": "Shirts",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Product 3: Classic Denim Jeans
```json
{
  "_id": "ObjectId('...')",
  "name": "Classic Denim Jeans - Comfort Fit",
  "description": "Our signature denim jeans are designed for the modern individual who values both style and comfort. Made from premium denim fabric with just the right amount of stretch, these jeans move with you throughout your day. The classic fit flatters all body types while providing durability that lasts for years. Perfect for casual outings, weekend trips, or relaxed office days.",
  "price": 1899,
  "sizes": ["28", "30", "32", "34", "36", "38"],
  "colors": ["Dark Blue", "Light Blue", "Black", "Gray"],
  "images": [
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg"
  ],
  "stock": 25,
  "sku": "JETH-JEANS-003",
  "category": "Jeans",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## Sample Order Document

### Order Example
```json
{
  "_id": "ObjectId('...')",
  "orderId": "JETH-20240115-001",
  "products": [
    {
      "productId": "ObjectId('...')",
      "name": "Premium Cotton T-Shirt - Classic White",
      "price": 599,
      "quantity": 2,
      "size": "L",
      "color": "White",
      "image": "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg"
    },
    {
      "productId": "ObjectId('...')",
      "name": "Classic Denim Jeans - Comfort Fit",
      "price": 1899,
      "quantity": 1,
      "size": "32",
      "color": "Dark Blue",
      "image": "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
    }
  ],
  "totalAmount": 3097,
  "customer": {
    "name": "Ramesh Kumar Sharma",
    "mobile": "9876543210",
    "email": "ramesh.sharma@gmail.com",
    "address": "123, MG Road, Sector 15, Apartment Block A, Unit 204, Near City Mall, Gurgaon, Haryana - 122001"
  },
  "paymentMethod": "COD",
  "status": "placed",
  "createdAt": "2024-01-15T14:25:30.000Z",
  "updatedAt": "2024-01-15T14:25:30.000Z"
}
```

## Customer Session Cart Example

### Session Cart Structure
```json
{
  "cart": [
    {
      "productId": "ObjectId('...')",
      "name": "Premium Cotton T-Shirt - Classic White",
      "price": 599,
      "image": "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
      "size": "L",
      "color": "White",
      "quantity": 2
    },
    {
      "productId": "ObjectId('...')",
      "name": "Classic Denim Jeans - Comfort Fit",
      "price": 1899,
      "image": "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
      "size": "32",
      "color": "Dark Blue",
      "quantity": 1
    }
  ]
}
```

## Database Queries Examples

### Find Products by Category
```javascript
// Find all T-Shirts
db.products.find({ category: "T-Shirts" })

// Find products in stock
db.products.find({ stock: { $gt: 0 } })

// Search products by name
db.products.find({ 
  name: { $regex: "cotton", $options: "i" } 
})
```

### Order Queries
```javascript
// Find orders by status
db.orders.find({ status: "placed" })

// Find orders by customer email
db.orders.find({ 
  "customer.email": "ramesh.sharma@gmail.com" 
})

// Find orders by date range
db.orders.find({
  createdAt: {
    $gte: ISODate("2024-01-01"),
    $lte: ISODate("2024-01-31")
  }
})
```

## Validation Rules

### Product Validation
- **name**: Required, minimum 5 characters
- **price**: Required, positive number
- **stock**: Required, non-negative integer
- **sku**: Required, unique identifier
- **category**: Must be one of the defined categories
- **images**: At least one image URL required

### Order Validation
- **customer.name**: Required, minimum 2 characters
- **customer.mobile**: Required, 10-digit Indian mobile number
- **customer.email**: Required, must end with "@gmail.com"
- **customer.address**: Required, minimum 10 characters
- **products**: Must have at least one product
- **totalAmount**: Must be positive number

### Session Cart Validation
- **productId**: Must be valid MongoDB ObjectId
- **quantity**: Must be positive integer, not exceed stock
- **size**: Must be from available sizes for the product
- **color**: Must be from available colors for the product

## Environment Variables

### Required Environment Variables
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/jethalal_clothing

# Session Configuration (optional)
SESSION_SECRET=jethalal-secret-key-2024

# Email Configuration (for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@jethalal.com
SMTP_PASS=your-app-password
```

## Testing Data

### Test Customer Information
```json
{
  "name": "Test Customer",
  "mobile": "9876543210",
  "email": "test.customer@gmail.com",
  "address": "123 Test Street, Test City, Test State - 123456"
}
```

### Test Product IDs (after seeding)
- Premium Cotton T-Shirt: First product in collection
- Formal Cotton Shirt: Second product in collection  
- Classic Denim Jeans: Third product in collection

## Error Handling Examples

### Common Error Responses
```json
{
  "error": "Product not found",
  "code": "PRODUCT_NOT_FOUND",
  "status": 404
}

{
  "error": "Invalid email format. Only Gmail addresses are accepted.",
  "code": "INVALID_EMAIL",
  "status": 400
}

{
  "error": "Product out of stock",
  "code": "OUT_OF_STOCK",
  "status": 400
}
```

This document provides comprehensive examples of all data structures used in the Jethalal Clothing website for development and testing purposes.