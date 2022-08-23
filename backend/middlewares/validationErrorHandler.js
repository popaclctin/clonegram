const { getHttpStatusCode } = require('../utils/errorMiddleware');

function errorHandler(error, req, res, next) {
  if (!error.hasOwnProperty('errors')) {
    return next(error);
  }

  res.status(getHttpStatusCode({ error, res }));

  res.json({ errors: error.errors, message: 'VALIDATION_ERROR' });

  //ensure any remaining middleware are run
  next();
}

module.exports = errorHandler;
