module.exports = {
  getErrorMessage,
  logErrorMessage,
  getHttpStatusCode,
};

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
