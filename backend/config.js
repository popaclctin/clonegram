require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: proscess.env.JWT_SECRET || 'YOUR_SECRET_KEY',
};

module.exports = config;
