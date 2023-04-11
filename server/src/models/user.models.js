const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
      lastName: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
        unique:true
    },
    imagePath: {
        type: String,
        required:true
    },
},
    { timestamps: true }
)
const user = new mongoose.model("users", userSchema);
module.exports = user;