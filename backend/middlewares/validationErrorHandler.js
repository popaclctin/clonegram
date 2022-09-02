const { getHttpStatusCode, logErrorMessage } = require('../utils/middleware');

function errorHandler(error, req, res, next) {
  if (error.hasOwnProperty('invalidParams')) {
    error.message = 'VALIDATION_ERROR';
  }
  next(error);
}

module.exports = errorHandler;
