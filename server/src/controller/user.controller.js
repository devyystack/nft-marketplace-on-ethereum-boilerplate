const saveUserProfile = require("../services/userProfile.service");
const env = require("dotenv").config();
const { CREATED, NO_CONTENT } = require('http-status-codes');
const { ApiError, ERRORS } = require('../utils/ApiError');
const httpStatus = require("http-status");
// create function for user
const createuser = async (req, res) => {  
  if (!req.file) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY,"Image Field Cannot Be Empty");
  }
  try {
    let fileurl;
    if (req.file) {
      fileurl=req.file.location;
    }
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      walletAddress: req.body.walletAddress.toLowerCase(),
      imagePath: fileurl ? fileurl : ''
    };
    const saveUser = await saveUserProfile.saveUserProfile(data);
    if (saveUser.length == 0) {
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "Profile Not Created Or Modified",
      });
    }else{
    res.status(CREATED).json({
      massage: "Profile Created Or Modified",
      result: saveUser,
    });
    }
    return;
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

/**
 * Updates an existing article
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 * @throws {ApiError}
 */
// get function for the user with wallet address
const getUser = async (req, res) => {  
  try {
    const getUser = await saveUserProfile.getUser(req.params.walletAddress);
    if (getUser.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "User Not Found",
      });
    }else{
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "User Found Successfully",
      result: getUser,
    });
    }
  } catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

/**
 * Updates an existing article
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 * @throws {ApiError}
 */
// function for the top user
const getTopUser = async (req, res) => {
  try {
    const topUser = await saveUserProfile.getTopUser(process.env.CONTRACT_ADDRESS);
    if (topUser.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Users Not Found",
      });
    }
    else{
    res.status(httpStatus.OK).json({
      massage: "Users Found Successfully",
      result: topUser,
    });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

module.exports = { createuser, getUser, getTopUser };
