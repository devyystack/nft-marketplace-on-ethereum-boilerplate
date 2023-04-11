const Joi = require("joi");


  const userValidation= Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    walletAddress: Joi.string().required(),
    imagePath: Joi.string()
  });


const getUserValidation = Joi.object({
    walletAddress: Joi.string().required(),
  });



module.exports = {
  userValidation,
  getUserValidation,
};
