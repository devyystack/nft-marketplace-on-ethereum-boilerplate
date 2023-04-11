const Joi = require('@hapi/joi');
const set = require('lodash.set');
const { ApiError, ERRORS } = require('../utils/ApiError');

/**
 * Formats Joi error into a key value fashion
 *
 * @param {Object} error Joi error object
 * @example
 * // returns { body: { name: 'is required' } }
 * formatError({ details: [{ path: ['body', 'name'], message: 'is required'}] });
 *
 * @returns { Object } a key value object with error messages
 */
const formatError = ({ details }) =>
  details.reduce((errorObj, { path, message }) => set(errorObj, path, message), {});

/**
 * Validates a value against an schema with predefined validation options
 */
const validateSchema = (schema, value) =>
  schema.validate(value, { abortEarly: false, errors: { label: false } });

/**
 * @param {Object} schema optional Joi schemas for params, query and body
 * @returns {Function} request validator middleware
 */
const requestValidator = ({ params = Joi.any(), query = Joi.any(), body = Joi.any() }) =>
  /**
   * Request validator middleware
   * Validates req params, query and body given its expected schemas.
   * Important: always the order of evaluation is:
   *   1 - req.params
   *   2 - req.query
   *   3 - req.body
   *
   * @param {Object} req Express req object
   * @param {Object} res Express res object
   * @param {Function} next next function
   *
   * @throws {ApiError}
   */
  (req, res, next) => {
    Object.entries({ params, query, body }).forEach(([chemaKey, schema]) => {
      const { error } = validateSchema(schema, req[chemaKey]);
      if (error) {
        throw new ApiError(ERRORS[`INVALID_REQUEST_${chemaKey.toUpperCase()}`], formatError(error));
      }
    });

    next();
  };

module.exports = requestValidator;
