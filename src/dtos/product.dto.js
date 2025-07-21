const {body, param} = require('express-validator')

exports.createProductDTO = [
    body("name").notEmpty().withMessage("Name is required"),
    body("slug").notEmpty().withMessage("Slug is required"),
    body("quantity").optional().isInt({min: 0}).withMessage("Quantity must be a non-negative integer")
]

exports.updateProductDTO = [
    param("id").isUUID().withMessage("Invalid product id type"),
    body("name").optional().isString(),
    body("slug").optional().isString(),
    body("quantity").optional().isInt({min: 0}).withMessage("Quantity must be a non-negative integer")
    
]

exports.findProductByIdDTO = [
    param("id").isUUID().withMessage("Invalid product id type")
]

exports.findProductBySlugDTO = [
    param("slug").notEmpty().withMessage("Slug is required")
]