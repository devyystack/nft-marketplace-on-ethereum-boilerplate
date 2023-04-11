const userNft = require("../controller/nft.controller");
const router = require("express").Router();
const { upload } = require("../controller/multer");
const Validation = require("../validation/nft.validation");
const requestValidator = require('../middlewares/request-validator');
const asyncHandler = require('express-async-handler');


router.route("/mintNft").post(
  upload.single("imagePath"),
  requestValidator({body:Validation.nftValidation}),
  asyncHandler(userNft.saveMintNft)
);
router.route("/updateNftStatus/:walletAddress/:id").patch(
  upload.single("imagePath"),
  requestValidator({params:Validation.updateNftStatusValidation}),
  asyncHandler(userNft.updateNftStatus)
);
router.route("/getCollection/:walletAddress").get(
  requestValidator({params:Validation.getCollectionValidation}),
  asyncHandler(userNft.getCollection)
);
router.route('/getSaleNft/:walletAddress').get(
  requestValidator({params:Validation.getSaleNftValidation}),
  asyncHandler(userNft.getSaleNft)
);
router.route('/getAuctionNft/:walletAddress').get(
  requestValidator({params:Validation.getAuctionNftValidation}),
  asyncHandler(userNft.getAuctionNft)
);
router.route('/getCategory').get(
  asyncHandler(userNft.getCategory)
);
router.route('/getSubCategory/:cId').get(
  requestValidator({params:Validation.getSubCatValidation}),
  asyncHandler(userNft.getSubCategory)
);
router.route('/getNftSaleCategory/:categoryId/:subCategoryId?').get(
  requestValidator({params:Validation.getNftSaleCategory}),
  asyncHandler(userNft.getNftSaleCategory)
);
router.route('/getOwnedNft/:walletAddress').get(
  requestValidator({params:Validation.getOwnedNftValidation}),
  asyncHandler(userNft.getOwnedNft)
);
router.route('/getOnSaleNft/:walletAddress').get(
  requestValidator({params:Validation.getOnSaleNftValidation}),
  asyncHandler(userNft.getOnSaleNft)
);
router.route('/getAllSaleNft').get(
  requestValidator({params:Validation.getAllSaleNftValidation}),
  asyncHandler(userNft.getAllSaleNft)
)
router.route('/updateNftTokenId/:id').patch(
  upload.single("imagePath"),
  requestValidator({params:Validation.updateNftTokenValidation}),
  asyncHandler(userNft.updateNftTokenId)
)
router.route('/updateNftMint/:walletAddress/:tokenId').patch(
  upload.single("imagePath"),
  requestValidator({params:Validation.updateNftMintValidation}),
  asyncHandler(userNft.updateNftMint)
)
router.route("/getAll").get(
  asyncHandler(userNft.getAll)
)
router.route("/getAllNft").get(
  asyncHandler(userNft.getAllNft)
)
router.route("/getNft/:tokenId").get(
  asyncHandler(userNft.getNft)
)

module.exports = router;
