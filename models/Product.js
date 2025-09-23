const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  sizes: [{
    type: String,
    trim: true
  }],
  colors: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Baby Food', 'Baby Care', 'Baby Safety', 'Baby Toys', 'Pet Food', 'Pet Toys', 'Pet Comfort', 'Pet Training', 'Pet Health']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);