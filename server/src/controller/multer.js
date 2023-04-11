const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const Aws = require('aws-sdk')
const multerS3=require('multer-s3')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Access_key and private_key for s3 Bucket
const s3Config=new Aws.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY,
  secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET,
  bucket: process.env.AWS_BUCKET_NAME,
});

// storage for the image 
const upload = multer({
  storage: multerS3({
      s3:s3Config,
      bucket: process.env.AWS_BUCKET_NAME+"/public",
      key: function (req, file, cb) {
        cb(null, file.originalname);
      }
    })   
  });


  
module.exports = { storage, upload };
