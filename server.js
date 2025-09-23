const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const ejsMate = require('ejs-mate');
require('dotenv').config();

const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/paws_store';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'jethalal-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Set EJS as template engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize cart in session
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.locals.cartCount = req.session.cart.reduce((total, item) => total + item.quantity, 0);
  next();
});

// Helper function to generate order ID
function generateOrderId() {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PAWS-${dateStr}-${random}`;
}

// Routes

// Home page
app.get('/', async (req, res) => {
  try {
    const featuredProducts = await Product.find().limit(6);
    res.render('home', { 
      title: 'Jethalal Clothing - Premium Quality with Trust',
      featuredProducts 
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.render('home', { 
      title: 'Jethalal Clothing - Premium Quality with Trust',
      featuredProducts: [] 
    });
  }
});

// Products page with search and pagination
app.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';

    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    
    const categories = await Product.distinct('category');

    res.render('products', {
      title: 'Our Premium Clothing Collection',
      products,
      currentPage: page,
      totalPages,
      search,
      category,
      categories
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.render('products', {
      title: 'Our Premium Clothing Collection',
      products: [],
      currentPage: 1,
      totalPages: 1,
      search: '',
      category: '',
      categories: []
    });
  }
});

// Product detail page
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('404', { title: 'Product Not Found' });
    }
    res.render('productDetail', {
      title: product.name,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(404).render('404', { title: 'Product Not Found' });
  }
});

// Buy Now page (direct checkout)
app.get('/products/:id/buy-now', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('404', { title: 'Product Not Found' });
    }
    
    // Create a temporary cart with this single product
    const tempCart = [{
      productId: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: '',
      color: '',
      quantity: 1
    }];
    
    const subtotal = product.price;
    
    res.render('buyNow', {
      title: `Buy ${product.name} - Fast Checkout`,
      product,
      cart: tempCart,
      subtotal,
      isBuyNow: true
    });
  } catch (error) {
    console.error('Error fetching product for buy now:', error);
    res.status(404).render('404', { title: 'Product Not Found' });
  }
});

// Process Buy Now
app.post('/buy-now', async (req, res) => {
  try {
    const { productId, name, mobile, email, address, size, color, quantity = 1 } = req.body;
    
    // Server-side validation
    const errors = [];
    
    if (!name || name.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters)');
    }
    
    if (!mobile || !/^\d{10}$/.test(mobile.replace(/\s+/g, ''))) {
      errors.push('Valid 10-digit mobile number is required');
    }
    
    if (!email || !email.toLowerCase().endsWith('@gmail.com')) {
      errors.push('Gmail address is required (must end with @gmail.com)');
    }
    
    if (!address || address.trim().length < 10) {
      errors.push('Complete shipping address is required (minimum 10 characters)');
    }
    
    if (!productId) {
      errors.push('Product selection is required');
    }

    if (errors.length > 0) {
      const product = await Product.findById(productId);
      const tempCart = [{
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: size || '',
        color: color || '',
        quantity: parseInt(quantity)
      }];
      
      return res.render('buyNow', {
        title: `Buy ${product.name} - Fast Checkout`,
        product,
        cart: tempCart,
        subtotal: product.price * parseInt(quantity),
        isBuyNow: true,
        errors,
        formData: { name, mobile, email, address, size, color, quantity }
      });
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).render('404', { title: 'Product Not Found' });
    }

    // Create order
    const orderId = generateOrderId();
    const totalAmount = product.price * parseInt(quantity);

    const order = new Order({
      orderId,
      products: [{
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity),
        size: size || '',
        color: color || '',
        image: product.images[0]
      }],
      totalAmount,
      customer: {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.toLowerCase().trim(),
        address: address.trim()
      },
      paymentMethod: 'COD',
      status: 'placed'
    });

    await order.save();
    res.redirect(`/order/${orderId}`);
    
  } catch (error) {
    console.error('Error processing buy now:', error);
    res.render('buyNow', {
      title: 'Fast Checkout',
      product: null,
      cart: [],
      subtotal: 0,
      isBuyNow: true,
      errors: ['An error occurred while processing your order. Please try again.'],
      formData: req.body
    });
  }
});

// Add to cart
app.post('/cart/add', async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingItemIndex = req.session.cart.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
      req.session.cart[existingItemIndex].quantity += parseInt(quantity);
    } else {
      req.session.cart.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
        color,
        quantity: parseInt(quantity)
      });
    }

    res.json({ 
      success: true, 
      cartCount: req.session.cart.reduce((total, item) => total + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Cart page
app.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  res.render('cart', {
    title: 'Shopping Cart',
    cart,
    subtotal
  });
});

// Update cart quantity
app.post('/cart/update', (req, res) => {
  const { index, quantity } = req.body;
  
  if (req.session.cart[index]) {
    if (quantity > 0) {
      req.session.cart[index].quantity = parseInt(quantity);
    } else {
      req.session.cart.splice(index, 1);
    }
  }
  
  res.redirect('/cart');
});

// Remove from cart
app.post('/cart/remove', (req, res) => {
  const { index } = req.body;
  
  if (req.session.cart[index]) {
    req.session.cart.splice(index, 1);
  }
  
  res.redirect('/cart');
});

// Checkout page
app.get('/checkout', (req, res) => {
  const cart = req.session.cart || [];
  
  if (cart.length === 0) {
    return res.redirect('/cart');
  }
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  res.render('checkout', {
    title: 'Checkout - Cash on Delivery',
    cart,
    subtotal
  });
});

// Process checkout
app.post('/checkout', async (req, res) => {
  try {
    const { name, mobile, email, address } = req.body;
    const cart = req.session.cart || [];

    // Server-side validation
    const errors = [];
    
    if (!name || name.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters)');
    }
    
    if (!mobile || !/^\d{10}$/.test(mobile.replace(/\s+/g, ''))) {
      errors.push('Valid 10-digit mobile number is required');
    }
    
    if (!email || !email.toLowerCase().endsWith('@gmail.com')) {
      errors.push('Gmail address is required (must end with @gmail.com)');
    }
    
    if (!address || address.trim().length < 10) {
      errors.push('Complete shipping address is required (minimum 10 characters)');
    }
    
    if (cart.length === 0) {
      errors.push('Cart cannot be empty');
    }

    if (errors.length > 0) {
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      return res.render('checkout', {
        title: 'Checkout - Cash on Delivery',
        cart,
        subtotal,
        errors,
        formData: { name, mobile, email, address }
      });
    }

    // Create order
    const orderId = generateOrderId();
    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const order = new Order({
      orderId,
      products: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image
      })),
      totalAmount,
      customer: {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.toLowerCase().trim(),
        address: address.trim()
      },
      paymentMethod: 'COD',
      status: 'placed'
    });

    await order.save();

    // Clear cart
    req.session.cart = [];

    res.redirect(`/order/${orderId}`);
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.render('checkout', {
      title: 'Checkout - Cash on Delivery',
      cart: req.session.cart || [],
      subtotal: req.session.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      errors: ['An error occurred while processing your order. Please try again.'],
      formData: req.body
    });
  }
});

// Order success page
app.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).render('404', { title: 'Order Not Found' });
    }

    res.render('success', {
      title: 'Order Placed Successfully',
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(404).render('404', { title: 'Order Not Found' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Jethalal Clothing website running on http://localhost:${PORT}`);
});