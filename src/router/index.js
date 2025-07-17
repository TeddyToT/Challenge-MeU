const express = require('express')


const router = express.Router()

router.use('/api', require('./api/productRouter'))

router.use('/api', require('./api/accessRouter'))

module.exports = router