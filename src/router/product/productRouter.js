const express = require("express")
const router = express.Router()
const ProductController = require('../../controllers/productController')

router.get('/product', ProductController.getAllProduct)
router.post('/product', ProductController.addProduct)
router.get('/product/:id', ProductController.getProductById)
router.get('/product/slug/:slug', ProductController.getProductBySlug)
router.put('/product/:id', ProductController.updateProduct)
router.delete('/product/:id', ProductController.deleteProduct)

module.exports = router