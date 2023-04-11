const user = require("../controller/user.controller");
const router = require("express").Router();
const { upload } = require("../controller/multer");
const asyncHandler = require('express-async-handler');
const Validation = require("../validation/user.validation");
const requestValidator = require('../middlewares/request-validator');


router.route("/createUser").post(
  upload.single("imagePath"),
  requestValidator({body:Validation.userValidation}),
  asyncHandler(user.createuser)

);
router.route("/getUser/:walletAddress").get(
  requestValidator({params:Validation.getUserValidation}),
  asyncHandler(user.getUser)
);
router.route("/getTopUser").get(
  asyncHandler(user.getTopUser)
);

module.exports = router;
