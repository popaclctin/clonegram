const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const createHttpError = require('http-errors');
const User = require('../models/User');

function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, 'You are not logged in'));
  }

  const authHeaderParts = authHeader.split(' ');
  if (
    authHeaderParts.length !== 2 ||
    authHeaderParts[0].localeCompare('Bearer')
  ) {
    return next(createHttpError(401, 'Malformed token'));
  }

  const token = authHeaderParts[1];
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
      return next(createHttpError(401, 'Invalid token'));
    }

    User.findById(decoded.id, function (err, user) {
      if (err) {
        return next(createHttpError(500, err));
      }

      if (!user) {
        return next(createHttpError(401, 'You are not logged in'));
      }

      req.user = user;

      next();
    });
  });
}

module.exports = authorize;
