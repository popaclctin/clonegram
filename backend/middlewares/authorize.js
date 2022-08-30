const createHttpError = require('http-errors');
const jwt = require('../utils/jwt');
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

  try {
    const decoded = jwt.verifyJwt(token);

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
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError': {
        return next(createHttpError(401, 'Token expired'));
      }
      case 'JsonWebTokenError': {
        return next(createHttpError(401, 'Invalid token'));
      }
    }
    return next(createHttpError(500, err));
  }
}

module.exports = authorize;
