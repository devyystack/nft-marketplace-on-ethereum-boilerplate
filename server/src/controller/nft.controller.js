const { CREATED, NO_CONTENT } = require('http-status-codes');
const { ApiError, ERRORS } = require('../utils/ApiError');
const httpStatus = require("http-status");
const nftServices = require("../services/nft.service");
const category = require('../models/category.models')
const mongoose = require('mongoose');
const subCategory = require("../models/subcategory.models");
/**
 * Creates a new article
 *
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 *
 * @throws {ApiError}
 */

// |||||| create nft function ||||||
const saveMintNft = async (req, res) => {
  try {
    if (req.body.type == "resell") {
      var data = {
        nftName: req.body.nftName,
        nftDiscription: req.body.nftDiscription,
        nftPrice: req.body.nftPrice,
        contractAddress: process.env.CONTRACT_ADDRESS.toLowerCase(),
        walletAddress: req.body.walletAddress.toLowerCase(),
        parentId: req.body.parentId,
        categoryId: mongoose.Types.ObjectId(req.body.categoryId),
        subCategoryId: mongoose.Types.ObjectId(req.body.subCategoryId),
        imagePath: req.body.imagePath,
        type: req.body.type,
      };
    }
    else {
      if (!req.file) {
        throw new ApiError(ERRORS.INVALID_REQUEST_BODY, "Image Field Cannot Be Empty");
      }
      else {
        // try {
        const fileUrl = req.file.location;
        // const fileurl = process.env.SERVER_URL + "/public/" + req.file.filename;
        var data = {
          nftName: req.body.nftName,
          nftDiscription: req.body.nftDiscription,
          nftPrice: req.body.nftPrice,
          contractAddress: process.env.CONTRACT_ADDRESS.toLowerCase(),
          walletAddress: req.body.walletAddress.toLowerCase(),
          parentId: req.body.parentId,
          categoryId: mongoose.Types.ObjectId(req.body.categoryId),
          subCategoryId: mongoose.Types.ObjectId(req.body.subCategoryId),
          imagePath: fileUrl,
          type: req.body.type
        };
      }
    }
    const resp = await nftServices.saveNft(data);

    if (resp.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "NFT Not Created",
      });
    }
    else {
      res.status(CREATED).json({
        massage: "NFT Created Successfully",
        result: resp,
      });
    }
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
//  |||||| function for update the nftPrice and status ||||||
const updateNftStatus = async (req, res) => {
  try {
    const data = {
      nftPrice: req.body.nftPrice,
      ipfsUrl: req.body.ipfsUrl,
      tokenId: req.body.tokenId,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    console.log(data)
    const updateNft = await nftServices.updateStatus(req.params.walletAddress, req.params.id, data);
    if (updateNft.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "NFT Not Found",
      });
    } else {
      res.status(httpStatus.OK).json({
        Message: "NFT Updated Successfully",
        result: updateNft
      });
    }
  }
  catch (err) {
    console.log(err)
    // throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
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
//  |||||| function for get nft set on sale with walletaddress ||||||
const getCollection = async (req, res) => {
  try {
    const getCollections = await nftServices.getCollection(req.params.walletAddress, process.env.CONTRACT_ADDRESS);
    if (getCollections.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "No NFT Found",
      });
    } else {
      res.status(200).json({
        massage: "NFT Found Successfully",
        result: getCollections,
      });
    }
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
//  function for get total of sale nftprice 
const getSaleNft = async (req, res) => {
  try {
    const saleNft = await nftServices.nftSale(req.params.walletAddress, process.env.CONTRACT_ADDRESS);
    if (saleNft.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Sell NFT Not Found",
      });
    } else {
      res.status(200).json({
        massage: "Sell NFT Found Successfully",
        result: saleNft,
      });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};
//  get the list of category of nft 
const getCategory = async (req, res) => {
  try {
    const category = await nftServices.getCat();
    if (category.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Category Not Found",
      });
    } else {
      res.status(200).json({
        massage: "Categories Found Successfully",
        result: category,
      });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

// get the list of subcategory based on category
const getSubCategory = async (req, res) => {
  try {
    const getSubCat = await nftServices.getSubCat(req.params.cId);
    if (getSubCat.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "SubCategories Not Found.",
      });
    } else {
      res.status(200).json({
        message: "SubCategories Found Successfully",
        result: getSubCat
      });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

//  get the NFT list which is set on sale based on categoryId and subCategoryId
const getNftSaleCategory = async (req, res) => {
  try {
    const getNftCat = await nftServices.getNftCat(req.params.categoryId, req.params.subCategoryId, process.env.CONTRACT_ADDRESS)
    if (getNftCat.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Nft Sell Categories Not Found",
      });
    } else {
      res.status(200).json({
        message: "Nft Sell Categories Found Successfully",
        result: getNftCat
      });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

// get NFT list which is set on owned
const getOwnedNft = async (req, res) => {
  try {
    const ownNft = await nftServices.ownNft(req.params.walletAddress, process.env.CONTRACT_ADDRESS)
    if (ownNft.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "NFT Owned Not Found",
      });
    } else {
      res.status(200).json({
        message: "NFT Owned Found Successfully",
        result: ownNft
      });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

// get nft list which is set on onsale 
const getOnSaleNft = async (req, res) => {
  try {
    const saleNft = await nftServices.saleNft(req.params.walletAddress, process.env.CONTRACT_ADDRESS)
    if (saleNft.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "NFT Sell Not Found",
      });
    } else {
      res.status(200).json({
        message: "NFT Sell Found Successfully",
        result: saleNft
      });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

const getAuctionNft = async (req, res) => {
  try {
    const auctionNft = await nftServices.auctionNft(req.params.walletAddress, process.env.CONTRACT_ADDRESS)
    if (auctionNft.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Auction NFT Not Found",
      });
    } else {
      res.status(200).json({
        message: "Auction NFT Found Successfully",
        result: auctionNft
      });
    }
  }
  catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

// get all nft list of set onsale 
const getAllSaleNft = async (req, res) => {
  try {
    const allSaleNft = await nftServices.allSaleNft(process.env.CONTRACT_ADDRESS)
    if (allSaleNft.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "On Sell NFT Not Found",
      });
    } else {
      res.status(200).json({
        message: "All OnSell NFT Found Successfully",
        result: allSaleNft
      });
    }
  } catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

//  update the tokenId into the nft database based on nftid
const updateNftTokenId = async (req, res) => {
  try {
    const updateTokenId = await nftServices.nftTokenId(req.params.id, req.body.tokenId)
    if (updateTokenId.modifiedcount == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "NFT Not Updated",
      });
    } else {
      res.status(httpStatus.OK).json({
        Message: "NFT Updated Successfully",
        result: updateTokenId
      });
    }
  } catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

// update the nft after the sale to the mint and change the wallet address
const updateNftMint = async (req, res) => {
  try {
    const mintUpdated = await nftServices.nftSaleMint(req.params.tokenId, req.params.walletAddress, process.env.CONTRACT_ADDRESS, req.body.walletAddress)
    if (mintUpdated.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "NFT Not Updated to Mint",
      });
    } else {
      res.status(httpStatus.OK).json({
        Message: "NFT Update to Mint Successfully",
        result: mintUpdated
      });
    }
  } catch (err) {
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY);
  }
};

const getAll = async (req, res) => {
  try {
    const found = await nftServices.getAll(process.env.CONTRACT_ADDRESS)
    if (found.length == 0) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "NFTs Not Found",
      });
    } else {
      res.status(httpStatus.OK).json({
        Message: "NFT Found",
        result: found
      });
    }
  } catch (err) {
    // console.log(err)
    throw new ApiError(ERRORS.INVALID_REQUEST_BODY,err.message);
  }
}
const getAllNft=async(req,res)=>{
  const result = await nftServices.getAllNft(process.env.CONTRACT_ADDRESS)
  if (result.length == 0) {
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "NFTs Not Found",
    });
  } else {
  res.status(httpStatus.OK).json({
    Message: "All NFTs Found",
    result: result
  });
}
}
const getNft=async(req,res)=>{
  const result = await nftServices.getNft(process.env.CONTRACT_ADDRESS,req.params.tokenId)
  if (result.length == 0) {
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "NFTs Not Found",
    });
  } else {
  res.status(httpStatus.OK).json({
    Message: "All NFTs Found",
    result: result
  });
}
} 

module.exports = {
  saveMintNft, updateNftStatus, getCollection, getSaleNft, getCategory,
  getSubCategory, getNftSaleCategory, getOwnedNft, getOnSaleNft, getAuctionNft, getAllSaleNft, updateNftTokenId,
  updateNftMint, getAll, getAllNft, getNft
};
