const router = require('express').Router();


router.use('/app',require('./nft.route'))
router.use('/app',require('./user.route'));
module.exports=router
