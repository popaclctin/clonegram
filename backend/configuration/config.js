const path = require('path');
//resolve path for debugging
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { DB_PROTOCOL, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } =
  process.env;

const dbURL = new URL(`${DB_PROTOCOL}://${DB_HOST}`);

if (DB_USER) {
  dbURL.username = DB_USER;
}
if (DB_PASSWORD) {
  dbURL.password = DB_PASSWORD;
}
if (DB_PORT) {
  dbURL.port = DB_PORT;
}
if (DB_NAME) {
  dbURL.pathname = DB_NAME;
}

console.log(dbURL.toString());

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.NODE_DOCKER_PORT || 8080,
  dbURL: dbURL.toString(),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRESIN,
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
};

module.exports = config;
