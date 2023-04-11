const bodyParser = require("body-parser");
const abi = require("../ABI/NFTmarket.json")
const nftabi = require("../ABI/NFT.json")
const category = require("../models/category.models");
const nft = require("../models/nft.models");
const nftModel = require("../models/nft.models")
const subCategory = require('../models/subcategory.models')
let Moralis = require("moralis/node");
const serverUrl = process.env.SERVERURL
const appId = process.env.APP_ID
const masterKey = process.env.MASTER_KEY

const saveNft = async (data) => {
  // create the nft 
  const saveNft = await nftModel.create(data);
  // console.log(saveNft)
  return saveNft;
}

const updateStatus = async (wallet, nftid, body) => {
  // find one and update the nftPrice and status
  const saveNft = await nftModel.findOneAndUpdate({ walletAddress: wallet, _id: nftid }, { ...body }, { upsert: true, new: true });
  // console.log(saveNft)
  return saveNft;
}
const getCollection = async (WalletAddress, contractAddress) => {
  // find nft list of mint based on walletaddress
  const saveNfts = await nftModel.find({ walletAddress: WalletAddress, contractAddress: contractAddress, $or: [{ status: 'mint' }, { status: 'burn' }]});
  return saveNfts
}

const nftSale = async (walletAddress, contractAddress) => {
  // get the total of nft sale 
  const res = await nftModel.aggregate([
    {
      $match: { status: "sell", walletAddress: walletAddress, contractAddress: contractAddress },
    },
    {
      $group: { _id: "$walletAddress", total: { $sum: "$nftPrice" } },
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
        as: "User",
      },
    },
  ]);
  return res;
}

const getCat = async () => {
  // get the nft category list 
  const getCat = await category.find({});
  return getCat
}

const getSubCat = async (data) => {
  // get nft subcategory list based on categoryId
  const subCat = await subCategory.find({ cId: data })
  // console.log(getsubcat)
  return subCat
}

const getNftCat = async (catid, subcatid, contractAddress) => {
  // get the nft list of set onsale based on categoryId and subcategoryId(optional)
  let query = { categoryId: catid, subCategoryId: subcatid, contractAddress, status: "sell" }
  if (!query.subCategoryId) {
    query = { categoryId: catid, contractAddress, status: "sell" }
  }
  const nftCat = await nftModel.find(query)
  // console.log(getnftcat)
  return nftCat
}

const ownNft = async (walletAddress, contractAddress) => {
  // get nft list of status mint 
  const ownNft = await nftModel.find({ walletAddress: walletAddress, contractAddress: contractAddress, status: 'mint' })
  // console.log(ownnft)
  return ownNft
}
// get nft list of status sale 
const saleNft = async (walletAddress, contractAddress) => {
  const saleNft = await nftModel.find({ walletAddress: walletAddress, contractAddress: contractAddress, status: "sell" })
  // console.log(ownnft)
  return saleNft
}

const auctionNft = async (walletAddress, contractAddress) => {
  const auctionNft = await nftModel.find({ walletAddress: walletAddress, contractAddress: contractAddress, status: "Auction" })
  // console.log(ownnft)
  return auctionNft
}

const allSaleNft = async (contractAddress) => {
  // list of all nft set onsale
  const allSaleNft = await nftModel.find({ contractAddress: contractAddress, $or: [{ status: 'sell' }, { status: 'Auction' }] })
  // console.log(allsalenft)
  return allSaleNft
}
const nftTokenId = async (data, body) => {
  // find one and update the tokenId 
  const nftTokenId = await nftModel.findOneAndUpdate({ _id: data }, { tokenId: body }, { upsert: true, new: true });
  return nftTokenId
}
const nftSaleMint = async (nftid, address, contractAddress, wallet) => {
  // find one and update the status mint after buy and change the wallet address
  const nftSaleMint = await nftModel.findOneAndUpdate({ tokenId: nftid, walletAddress: address, contractAddress: contractAddress }, { walletAddress: wallet, status: "mint" }, { upsert: true, new: true })
  // console.log(nftsalemint)
  return nftSaleMint
}

const getAll = async (contractAddress) => {
  await Moralis.start({ serverUrl, appId, masterKey });

  const options = {
    chain: "bsc testnet",
    address: "0x7F9d07Ca08C07C13e6E82b8dC3c017dC95eD2123",
    function_name: "fetchMarketItems",
    abi: abi,
    sync_historical: true
  };
  const allowance = await Moralis.Web3API.native.runContractFunction(options);
  // console.log(allowance)
  let tokeId = [];
  let wallet = [];
  let nftData = []
  allowance.map((nftDetail) => {
    tokeId.push(nftDetail[2])
    wallet.push(nftDetail[3])
    // console.log(tokeId)
    // console.log(wallet)
  })
  for (let i = 0; i < tokeId.length; i++) {
    var found = await nftModel.find({ contractAddress:contractAddress, tokenId: tokeId[i], walletAddress: wallet[i].toLowerCase(), status: "sell"});
    if (found.length != 0) {
      if (found[0].tokenId == allowance[i][2]) {
        var data = {
          buyer: allowance[i][4].toLowerCase(),
          seller: allowance[i][3].toLowerCase(),
          tokenId: allowance[i][2],
          itemId: allowance[i][0],
        }
        const d= await nftModel.findOneAndUpdate({contractAddress:contractAddress, walletAddress:found[0].walletAddress, _id:found[0]._id},{...data},{upsert:true, new : true, findAndModify:false})
        console.log(d)
        const sort = { createdAt: -1 };
        var auction = await nftModel.find({contractAddress:contractAddress, $or: [{ status: 'sell' }, { status: 'Auction' }]}).sort(sort);
      }
    }
    else {
      // console.log("not found")
    }
  }
  return auction
}

const getAllNft = async(contractAddress)=>{
  sort={createdAt:-1}
  const result =await nftModel.find({contractAddress:contractAddress, status:"sell"}).sort(sort);
  return result
}
const getNft = async(contractAddress,tokenId)=>{
  const result =await nftModel.find({contractAddress:contractAddress,tokenId:tokenId});
  return result
}


module.exports = { 
  nftSaleMint,
  nftTokenId,
  allSaleNft,
  saleNft,
  ownNft,
  saveNft,
  auctionNft,
  updateStatus,
  getCollection,
  nftSale,
  getCat,
  getSubCat,
  getNftCat,
  getAll,
  getAllNft,
  getNft
}