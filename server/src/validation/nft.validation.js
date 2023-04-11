const { objectId } = require('./custom.validation')
const Joi = require("joi");

const nftValidation = Joi.object({
  nftName: Joi.string().required(),
  nftDiscription: Joi.string().required(),
  nftPrice: Joi.string().required(),
  walletAddress: Joi.string().required(),
  parentId: Joi.string().required(),
  categoryId: Joi.required().custom(objectId),
  subCategoryId: Joi.required().custom(objectId),
  imagePath: Joi.string(),
  type: Joi.string()
});
const updateNftStatusValidation = Joi.object({
  walletAddress: Joi.string().required(),
  id: Joi.required().custom(objectId),
});

const getCollectionValidation = Joi.object({
  walletAddress: Joi.string().required(),
});

const getSaleNftValidation = Joi.object({
  walletAddress: Joi.string().required(),
});

const getSubCatValidation = Joi.object({
  cId: Joi.required().custom(objectId),
});

const getNftSaleCategory = Joi.object({
  categoryId: Joi.required().custom(objectId),
  subCategoryId: Joi.custom(objectId)
});

const getOwnedNftValidation = Joi.object({
  walletAddress: Joi.string().required(),
});

const getOnSaleNftValidation = Joi.object({
  walletAddress: Joi.string().required(),
});

const getAuctionNftValidation = Joi.object({
  walletAddress: Joi.string().required()
});
const updateNftMintValidation = Joi.object({
  walletAddress: Joi.string().required(),
  tokenId: Joi.number().required()
});
const updateNftTokenValidation = Joi.object({
  id: Joi.required().custom(objectId)
});

module.exports = {
  nftValidation,
  getSubCatValidation,
  getCollectionValidation,
  getNftSaleCategory,
  getSaleNftValidation,
  updateNftStatusValidation,
  getOwnedNftValidation,
  getOnSaleNftValidation,
  getAuctionNftValidation,
  updateNftMintValidation,
  updateNftTokenValidation,
};
