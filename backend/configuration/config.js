const path = require('path');
//resolve path for debugging
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.NODE_DOCKER_PORT || 8080,
  dbUrl: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRESIN,
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
};

module.exports = config;
