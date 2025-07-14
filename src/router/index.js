const express = require('express')
const router = express.Router()


router.use('/api', require('./product/productRouter'))



module.exports = router