const express = require("express")
const ProductController = require('../../controllers/productController')
const validate = require('../../middlewares/validate')
const {createProductDTO, updateProductDTO, findProductByIdDTO, findProductBySlugDTO} = require('../../dtos/product.dto')

const router = express.Router()

router.get('/', ProductController.getAllProduct)
router.post('/', createProductDTO,validate, ProductController.addProduct)
router.get('/:id', findProductByIdDTO, validate, ProductController.getProductById)
router.get('/slug/:slug', findProductBySlugDTO, validate, ProductController.getProductBySlug)
router.put('/:id', updateProductDTO, validate, ProductController.updateProduct)
router.delete('/:id', findProductByIdDTO, validate, ProductController.deleteProduct)

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