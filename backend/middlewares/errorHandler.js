const { env } = require('../config');
const {
  getErrorMessage,
  getHttpStatusCode,
  logErrorMessage,
} = require('../utils/middleware');

function errorHandler(error, req, res, next) {
  const errorMessage = getErrorMessage(error);

  logErrorMessage(errorMessage);

  //If response headers have already been sent, delegate to the next error handler
  if (res.headersSent) {
    return next(error);
  }

  const errorResponse = {
    statusCode: getHttpStatusCode({ error, res }),
    body: undefined,
  };

  //when the app is running in production, don't send error message or error stack
  if (env !== 'production') {
    errorResponse.body = errorMessage;
  }

  res.status(errorResponse.statusCode);
  //Perform content negotiation to send an appropriate response
  res.format({
    'application/json': () => {
      res.json({ message: errorResponse.body });
    },
    default: () => {
      res.type('text/plain').send(errorResponse.body);
    },
  });

  //ensure any remaining middleware are run
  next();
}

module.exports = errorHandler;
