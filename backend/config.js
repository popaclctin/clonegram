const path = require('path');
//resolve path for debugging
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
