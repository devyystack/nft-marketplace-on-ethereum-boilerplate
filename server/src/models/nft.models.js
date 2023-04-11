const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        // unique:true
    },
    contractAddress:{
        type:String,
        required:true
    },
    parentId:{
        type:String,
        default: 0
    },
    nftName: {
        type: String,
        required: true,
    },
      nftDiscription: {
        type: String,
        required: true,
    },
    nftPrice: {
        type: Number,
        required: true,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    tokenId:{
        type:String,
    },
    imagePath: {
        type: String,
    },
    ipfsUrl:{
        type:String
        },
    status:{
        type:String,
        default:"mint"
    },
    type:{
        type:String,        
    },
    buyer:{
        type:String,
    },
    seller:{
        type:String
    },
    itemId:{
        type:String
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    }
},
    { timestamps: true }
)
const nft = new mongoose.model("nft",nftSchema );
module.exports = nft;