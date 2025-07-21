const ProductService = require('../services/productService')


class ProductController {

    addProduct = async (req, res, next) => {
        try {
            const product = await ProductService.addProduct(req.body)
            return res.status(201).json({success: true, product})
        } catch (error) {
            next(error)
        }
    }

    getAllProduct = async (req, res, next) => {
        try {
            const products = await ProductService.getAllProduct()
            return res.status(200).json({success:true, products})
        } catch (error) {
            next(error)
        }
    }

    getProductById = async (req, res, next) => {

        try {
            const product = await ProductService.getProductById(req.params.id)
            return res.status(200).json({success: true, product})
        } catch (error) {
            next(error)
        }
    }
    getProductBySlug = async (req, res, next) => {
        try {
            const product = await ProductService.getProductBySlug(req.params.slug)
            return res.status(200).json({success: true, product})
        } catch (error) {
            next(error)
        }
    }


    updateProduct = async (req, res, next) => {
        try {
            const updated = await ProductService.updateProduct(req.params.id, req.body)
            return res.status(200).json({
                success:updated.success,
                updated: updated.data
            })
        } catch (error) {
            next(error)
        }
    }


    deleteProduct = async (req, res, next) => {
        try {
            const result = await ProductService.deleteProduct(req.params.id)
            return res.status(200).json({
                success:result.success,
                message: result.message
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()