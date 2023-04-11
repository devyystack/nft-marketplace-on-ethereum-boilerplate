const env = require("dotenv").config();
const mongoose = require("mongoose");
const url =`${process.env.MONGODBURL}`;
// Database connectivity
mongoose.connect(url, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info("Mongodb Connected");
  }
});
