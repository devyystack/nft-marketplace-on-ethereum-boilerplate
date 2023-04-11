const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  address: {
    type: String
  },
  blockHash: {
    type: String
  },
  blockNumber: {
    type: Number
  },
  logIndex: {
    type: Number
  },
  removed: {
    type: Boolean
  },
  transactionHash: {
    type: String
  },
  transactionIndex: {
    type: Number
  },
  id:{
    primaryKey:true,
    type: String
  },
  returnValues: {
    type: Object
  },
  event: {
    type: String
  },
  signature: {
    type: String
  },
  raw: {
    type:Object
  },
  from:{
    type: String
  },
  to:{
    type: String
  },
},
{ timestamps: true }
)
const transaction = new mongoose.model("transactions", transactionSchema);
module.exports = transaction;