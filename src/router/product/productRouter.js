const express = require("express")
const router = express.Router()
const ProductController = require('../../controllers/productController')

router.get('/product', ProductController.getAllProduct)
router.post('/product', ProductController.addProduct)
router.get('/product/:id', ProductController.getProductById)
router.get('/product/slug/:slug', ProductController.getProductBySlug)
router.put('/product/:id', ProductController.updateProduct)
router.delete('/product/:id', ProductController.deleteProduct)

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 */

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */

module.exports = router