const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../configuration/config');

module.exports.signJwt = signJwt;
module.exports.verifyJwt = verifyJwt;

function signJwt(payload) {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  return token;
}

function verifyJwt(token) {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
}
