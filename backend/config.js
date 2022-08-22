require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
