const user = require("../models/user.models");
const transacModel = require("../models/transaction.models");

const saveUserProfile = async (data) => {
  //   lets find or update if exist pass or if not exist then create  ||||||||||
  const res = await user.findOneAndUpdate({ walletAddress: data.walletAddress }, { ...data }, { upsert: true, new: true });
  return res;
};

const getUser = async (data) => {
  // |||||| find the user with wallet address ||||||
  const res = await user.find({ walletAddress: data });
  return res;
};
const getTopUser = async (contractAddress) => {
  // ||||||| lets find for the top user using aggregate |||||||
  const res = await transacModel.aggregate([
    {
      $match: {  address:contractAddress,  event: "MarketItemCreated" },
    },
    {
      $group: { _id: "$data.seller", count: { $sum: 1 } },
    },
    {
      $sort: { count: -1 },
    },
    { 
      $limit: 12,
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "walletAddress",
        as: "string",
      },
    },
    {
      $unwind: {
        path:'$string'
      }
    }
    
  ]);
//console.log(res)
  return res;
};
const getAllUsers = async () => {
  const res = await user.find({});
  return res;
};

module.exports = {
  saveUserProfile,
  getUser,
  getTopUser,
  getAllUsers,
};
