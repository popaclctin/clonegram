const {
  getErrorMessage,
  getHttpStatusCode,
  logErrorMessage,
} = require('../utils/middleware');

function errorHandler(error, req, res, next) {
  logErrorMessage(error.message);

  //If response headers have already been sent, delegate to the next error handler
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode);
  //Perform content negotiation to send an appropriate response
  res.format({
    'application/json': () => {
      res.json(error);
    },
    default: () => {
      res.type('text/plain').send(error.message);
    },
  });

  //ensure any remaining middleware are run
  next();
}

module.exports = errorHandler;
