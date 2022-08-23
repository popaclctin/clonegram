const { env } = require('../config');

function errorHandler(error, req, res, next) {
  const errorMessage = getErrorMessage(error);

  logErrorMessage(errorMessage);

  //If response headers have already been sent, delegate to the default Express error handler
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

//extract an error message or error stack from an Error object
function getErrorMessage(error) {
  if (error.stack) {
    return error.stack;
  }

  if (typeof error.toString === 'function') {
    return error.toString();
  }

  return '';
}

function logErrorMessage(error) {
  console.error(error);
}

function isErrorStatusCode(statusCode) {
  return statusCode >= 400 && statusCode < 600;
}

//Look for an error HTTP status code
function getHttpStatusCode({ error, res }) {
  const statusCodeFromError = error.status || error.statusCode;
  if (isErrorStatusCode(statusCodeFromError)) {
    return statusCodeFromError;
  }

  //check status code in the response object. The default is 200, unless it was modified by other handler or middleware
  const statusCodeFromResponse = res.statusCode;
  if (isErrorStatusCode(statusCodeFromResponse)) {
    return statusCodeFromResponse;
  }

  return 500;
}

module.exports = errorHandler;
