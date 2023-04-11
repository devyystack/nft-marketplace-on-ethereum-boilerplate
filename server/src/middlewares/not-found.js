const { ApiError, ERRORS } = require('../utils/ApiError');

/**
 * Not found middleware
 * Place this middleware after all routes were defined and will send a 404 http error
 * to the next middleware.
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 * @param {Function} next next function
 *
 * @throws { NotFound } 404 HTTP NotFound error
 */
function notFound(req, res, next) {
  next(new ApiError(ERRORS.NOT_FOUND));
}

module.exports = notFound;
