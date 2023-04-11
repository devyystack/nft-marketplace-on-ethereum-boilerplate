const HttpStatus = require('http-status-codes');

const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR, NOT_FOUND } = HttpStatus;

const ERRORS = Object.freeze({
  // 400
  INVALID_REQUEST_BODY: {
    appCode: 'INVALID_REQUEST_BODY',
    statusCode: BAD_REQUEST,
    status: HttpStatus.getStatusText(BAD_REQUEST),
    message: 'Invalid request body',
  },
  INVALID_REQUEST_QUERY: {
    appCode: 'INVALID_REQUEST_QUERY',
    statusCode: BAD_REQUEST,
    status: HttpStatus.getStatusText(BAD_REQUEST),
    message: 'Invalid request querystring',
  },
  INVALID_REQUEST_PARAMS: {
    appCode: 'INVALID_REQUEST_PARAMS',
    statusCode: BAD_REQUEST,
    status: HttpStatus.getStatusText(BAD_REQUEST),
    message: 'Invalid request route params',
  },

  // 401
  MISSING_AUTH_HEADER: {
    appCode: 'MISSING_AUTH_HEADER',
    statusCode: UNAUTHORIZED,
    status: HttpStatus.getStatusText(UNAUTHORIZED),
    message: 'Missing Authorization header. Please set it with a Bearer token',
  },
  INVALID_AUTH_SCHEMA: {
    appCode: 'INVALID_AUTH_SCHEMA',
    statusCode: UNAUTHORIZED,
    status: HttpStatus.getStatusText(UNAUTHORIZED),
    message: 'Invalid Authorization header schema. It should be Bearer',
  },
  INVALID_AUTH_TOKEN: {
    appCode: 'INVALID_AUTH_TOKEN',
    statusCode: UNAUTHORIZED,
    status: HttpStatus.getStatusText(UNAUTHORIZED),
    message: 'Invalid token in Authorization header',
  },

  // 404
  NOT_FOUND: {
    appCode: 'NOT_FOUND',
    statusCode: NOT_FOUND,
    status: HttpStatus.getStatusText(NOT_FOUND),
    message: 'Requested resource was not found',
  },

  // 500
  UNEXPECTED: {
    appCode: 'UNEXPECTED',
    statusCode: INTERNAL_SERVER_ERROR,
    status: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
    message: 'Ups! Something went wrong :(',
  },
});

class ApiError extends Error {
  constructor({ message, statusCode, status, appCode } = ERRORS.UNEXPECTED_ERROR, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.appCode = appCode;
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = {
  ApiError,
  ERRORS,
};
