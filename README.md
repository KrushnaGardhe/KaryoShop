# Jethalal Clothing - Complete E-commerce Website

A complete clothing shopping website built with Node.js, Express.js, MongoDB, and EJS templates. Features Cash on Delivery (COD) payment system with trust-building design focused on family values.

## 🌟 Features

### Customer Features
- **Trust-First Design**: Family-oriented branding with COD-focused messaging
- **Product Catalog**: Browse clothing with search and category filtering
- **Product Details**: Detailed product pages with multiple images, sizes, and colors
- **Shopping Cart**: Session-based cart with quantity management
- **COD Checkout**: Simple checkout process requiring only basic information
- **Order Confirmation**: Detailed order confirmation with tracking information
- **Responsive Design**: Mobile-friendly Bootstrap 5 interface

### Technical Features
- **Server-Side Rendering**: EJS templates for SEO-friendly pages
- **MongoDB Integration**: Proper data modeling with Mongoose
- **Session Management**: Cart persistence across browser sessions
- **Form Validation**: Both client-side and server-side validation
- **Order Management**: Custom order ID generation and status tracking
- **Email Validation**: Specific Gmail requirement for customer trust

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS Templates, Bootstrap 5, Vanilla JavaScript
- **Styling**: Custom CSS with Bootstrap components
- **Session**: Express-session for cart management

## 📁 Project Structure

```
jethalal-clothing-website/
├── models/
│   ├── Product.js          # Product data model
│   └── Order.js           # Order data model
├── views/
│   ├── layout.ejs         # Main layout template
│   ├── home.ejs          # Homepage
│   ├── products.ejs      # Product catalog
│   ├── productDetail.ejs # Product details
│   ├── cart.ejs          # Shopping cart
│   ├── checkout.ejs      # Checkout form
│   └── success.ejs       # Order confirmation
├── public/
│   ├── css/
│   │   └── style.css     # Custom styles
│   └── js/
│       └── script.js     # Client-side JavaScript
├── server.js             # Main server file
├── seed.js              # Database seeding script
├── package.json         # Dependencies
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jethalal-clothing-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/jethalal_clothing
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   or for production:
   ```bash
   npm start
   ```

7. **Open your browser**
   Visit `http://localhost:3000` to see the website.

## 📊 Database Models

### Product Schema
```javascript
{
  name: String,
  description: String,
  price: Number,
  sizes: [String],
  colors: [String],
  images: [String],
  stock: Number,
  sku: String,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  orderId: String,
  products: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String,
    image: String
  }],
  totalAmount: Number,
  customer: {
    name: String,
    mobile: String,
    email: String,
    address: String
  },
  paymentMethod: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample products

## 🎯 Key Features Explained

### Trust-Building Elements
- **Family Values**: Messaging emphasizes honesty and family business approach
- **COD Focus**: No advance payment required, building customer trust
- **Personal Touch**: "We call before delivery" messaging
- **Testimonials**: Real customer experiences highlighting trust

### COD (Cash on Delivery) Workflow
1. **Customer browses** products without needing to register
2. **Adds items to cart** with size/color selection
3. **Provides basic info** during checkout (name, mobile, Gmail, address)
4. **Places order** with COD payment method
5. **Receives confirmation** with order ID and next steps
6. **Gets called** by team for order confirmation
7. **Pays cash** when product is delivered

### Form Validation
- **Client-side**: Real-time validation with visual feedback
- **Server-side**: Comprehensive validation before order creation
- **Gmail Requirement**: Only Gmail addresses accepted for trust
- **Mobile Validation**: 10-digit Indian mobile number format

## 🎨 Design Principles

### Visual Design
- **Bootstrap 5**: Modern, responsive framework
- **Custom CSS**: Enhanced styling for brand consistency
- **Trust Colors**: Blue (trust), green (money/COD), yellow (warmth)
- **Family Imagery**: Photos emphasizing family and happiness

### User Experience
- **Mobile-First**: Responsive design for all devices
- **Fast Loading**: Optimized images and minimal JavaScript
- **Clear Navigation**: Intuitive menu and breadcrumbs
- **Trust Indicators**: Badges, testimonials, and guarantees

## 📱 API Endpoints

### Public Routes
- `GET /` - Homepage
- `GET /products` - Product catalog with search/filter
- `GET /products/:id` - Product details
- `GET /cart` - Shopping cart
- `GET /checkout` - Checkout form
- `GET /order/:orderId` - Order confirmation

### API Routes
- `POST /cart/add` - Add product to cart
- `POST /cart/update` - Update cart quantity
- `POST /cart/remove` - Remove from cart
- `POST /checkout` - Process order

## 🔒 Security Features

- **Input Validation**: All user inputs validated and sanitized
- **Session Security**: Secure session configuration
- **Email Verification**: Gmail-only policy for customer verification
- **Order Verification**: Phone call confirmation before processing

## 📈 Sample Data

The seed script includes 6 sample products across different categories:
- Premium Cotton T-Shirts
- Formal Cotton Shirts  
- Classic Denim Jeans
- Cozy Winter Hoodies
- Casual Cotton Trousers
- Stylish Denim Jackets

Each product includes:
- Multiple high-quality images
- Size and color options
- Detailed descriptions
- Competitive pricing
- Stock management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email**: contact@jethalal.com
- **Phone**: +91-9876543210
- **Address**: Gokuldham Society, Powder Gali, Mumbai - 400001

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Bootstrap** for the responsive framework
- **Font Awesome** for icons
- **Pexels** for stock photography
- **MongoDB** for database solution
- **Express.js** community for excellent documentation

---

**Made with ❤️ for families who value trust and quality**