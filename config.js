require('dotenv').config();

module.exports = {
  secret: process.env.JWT_KEY,
  mongoUrl: process.env.MONGODB_URI
};