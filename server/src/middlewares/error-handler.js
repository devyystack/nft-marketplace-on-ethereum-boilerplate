const { ApiError, ERRORS } = require('../utils/ApiError');

function sendError(res, { statusCode, status, appCode, message, details }) {
  return res.status(statusCode).json({
    statusCode,
    status,
    appCode,
    message,
    details,
  });
}

/**
 * Global Error Handler middleware
 *
 * @param {*} error received error
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 * @param {Function} next next function
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof ApiError) {
    sendError(res, error);
  } else {
    // Send an Unxpected Error by default
    sendError(
      res,
      new ApiError(ERRORS.UNEXPECTED, {
        message: error.message,
        originalError: error,
      })
    );
  }
}

module.exports = errorHandler;
