require('dotenv').config(); // ← tambahkan .config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// console.log("MONGO_URI:", process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

db.once('open', () => {
  console.log('✅ MongoDB connected successfully');
});

module.exports = db;
