const ProductService = require('../database/productService')

class ProductController {

    addProduct = async (req, res,next) => {
        try {
            return res.status(201).json(await ProductService.addProduct(req.body))
        } catch (error) {
            next(error)
        }
    }

    getAllProduct = async (req, res, next) => {
        try {
            return res.status(201).json(await ProductService.getAllProduct())
        } catch (error) {
            next(error)
        }
    }

    getProductById = async (req, res, next) => {
        try {
            return res.status(201).json(await ProductService.getProductById(req))
        } catch (error) {
            next(error)
        }
    }
    getProductBySlug = async (req, res, next) => {
        try {
            return res.status(201).json(await ProductService.getProductBySlug(req))
        } catch (error) {
            next(error)
        }
    }


    updateProduct = async (req, res, next) => {
        console.log(`Incoming: ${req.method} ${req.url}`);
        try {
            return res.status(201).json(await ProductService.updateProduct(req.params.id, req.body))
        } catch (error) {
            next(error)
        }
    }


    deleteProduct = async (req, res, next) => {
        try {
            return res.status(201).json(await ProductService.deleteProduct(req))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()