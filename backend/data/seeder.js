const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log("MONGO_URI from .env:", process.env.MONGO_URI); // debug

const Product = require('../model/ProductModel'); // make sure this path is correct
const products = require('./products');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected...');
  await Product.deleteMany(); // optional: clears old products
  await Product.insertMany(products);
  console.log('Data imported!');
  process.exit();
})
.catch((err) => {
  console.error('Import error:', err);
  process.exit(1);
});
