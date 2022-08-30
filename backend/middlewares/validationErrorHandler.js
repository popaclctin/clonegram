const { getHttpStatusCode, logErrorMessage } = require('../utils/middleware');

function errorHandler(error, req, res, next) {
  if (!error.hasOwnProperty('invalidParams')) {
    return next(error);
  }

  // logErrorMessage(error.invalidParams);

  res.status(getHttpStatusCode({ error, res }));

  res.json({ invalidParams: error.invalidParams, message: 'VALIDATION_ERROR' });

  //ensure any remaining middleware are run
  next();
}

module.exports = errorHandler;
