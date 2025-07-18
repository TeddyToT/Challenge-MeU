const express = require("express")
const router = express.Router()
const ProductController = require('../../controllers/productController')

router.get('/', ProductController.getAllProduct)
router.post('/', ProductController.addProduct)
router.get('/:id', ProductController.getProductById)
router.get('/slug/:slug', ProductController.getProductBySlug)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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