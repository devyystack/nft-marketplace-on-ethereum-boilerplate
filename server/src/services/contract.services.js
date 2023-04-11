require('dotenv').config
const Web3 = require("web3");
var abi = require("../ABI/NFTmarket.json");
const Provider = require('@truffle/hdwallet-provider');
const transaction = require("../models/transaction.models");
let Moralis = require("moralis/node");
/* Moralis init code */
const serverUrl = process.env.SERVERURL
const appId = process.env.APP_ID
const masterKey = process.env.MASTER_KEY
// fetching transactions from the Moralis   
async function userTransaction(req, res) {
  await Moralis.start({ serverUrl, appId, masterKey });
  let query=await new Moralis.Query("transaction")
  // let results = await query.find({ useMasterKey: true })
  // results=JSON.parse(JSON.stringify(results))
  // console.log(results)
  var subscription=await query.subscribe();
  // console.log("subs",subscription)
  subscription.on('open',(events)=>{
  })
  subscription.on('create', (event) => {
  });
  subscription.on('update', (event) => {
    // event=JSON.parse(JSON.stringify(event))
    // console.log(event)
  const allData = {
    address: event.address,
    block_hash: event.block_hash,
    block_number: event.block_number,
    block_timestamp:event.block_timestamp.iso,
    transaction_hash: event.transaction_hash,
    event: "MarketItemCreated",
    from: event.seller,
    to: event.owner,
    nftContract:event.nftContract,
    itemId: event.itemId,
    tokenId:event.tokenId,
    seller:event.seller,
    owner:event.owner,
    price:event.price,
    sold:event.sold,
  };
  // console.log(allData)
  transaction.findOne({ transaction_hash: allData.transaction_hash }).then((data) => {
  if (data) {
    // console.log("found",data)
    return;
  } else {
    transaction.create(allData);
    // console.log(event)
    }
  });
  });
  subscription.on('enter', (object) => {
    // console.log('enter',object);
  });
}
module.exports = { userTransaction };
