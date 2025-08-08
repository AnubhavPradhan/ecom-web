// backend/db.js
require('dotenv').config();
const mongoose = require('mongoose');

// Prefer MONGODB_URI (compose) or fallback to MONGO_URI
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  console.error('FATAL: Mongo connection string is missing. Set MONGODB_URI (or MONGO_URI).');
  process.exit(1);
}

// ❌ REMOVE this for Mongoose 7+
// mongoose.set('strictQuery', true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
