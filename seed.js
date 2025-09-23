const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/paws_store';

// Sample pet and baby products data - focused on transformation and pain relief
const sampleProducts = [
  {
    name: "Premium Dog Training Treats - Behavior Transformation",
    description: "FINALLY train your dog without the frustration! Transform your disobedient, stubborn dog into an obedient, loving companion. These aren't ordinary treats - they're MOTIVATION in every bite. Made with real chicken and brain-boosting nutrients, these treats make training 10x faster. Professional dog trainers use these exclusively. Over 20,000 dog owners report their 'impossible' dogs learned basic commands in just 7 days. No more embarrassing behavior - just a well-trained dog you're proud to show off.",
    price: 899,
    sizes: ["Small Bag", "Large Bag", "Training Pack"],
    colors: ["Chicken", "Beef", "Salmon"],
    images: [
      "https://images.pexels.com/photos/5732451/pexels-photo-5732451.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5732452/pexels-photo-5732452.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    stock: 67,
    sku: "PAWS-TREATS-006",
    category: "Pet Training"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing products
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // Insert sample products
    console.log('Inserting sample products...');
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products:`);
    
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.sku}) - ₹${product.price}`);
    });

    console.log('\n✅ Database seeded successfully!');
    console.log('You can now start your server with: npm start or npm run dev');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleProducts, seedDatabase };