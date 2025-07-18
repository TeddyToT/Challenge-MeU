const express = require('express')
const auth = require('../middlewares/auth')
const authMethod = require("../middlewares/authMethod")

const router = express.Router()
router.use('/api/product',authMethod, require('./api/productRouter'))

router.use('/api', require('./api/accessRouter'))

module.exports = router