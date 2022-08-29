const path = require('path');
//resolve path for debugging
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRESIN,
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
};

module.exports = config;
