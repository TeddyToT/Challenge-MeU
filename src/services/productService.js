const ProductModel = require("../models/productModel")

class ProductService {
  static async addProduct({ name, slug, quantity }) {
    try {
      if (!name) return { success: false, message: "Name is required" };
      if (!slug) return { success: false, message: "Slug is required" };

      const exists = await ProductModel.findBySlug(slug);
      if (exists)
        return { success: false, message: "Product slug already exists" };

      const product = await ProductModel.create({ name, slug, quantity });
      return { success: true, product };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static getAllProduct = async () => {
    try {
      const products = await ProductModel.findAll();
      return products;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  static getProductById = async (req) => {
    const id = req.params.id;
    try {
      const product = await ProductModel.findById(id)
      if (!product)
        return { success: false, message: "Product is not found" };

      return {product: product, header: req.originalUrl};
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  static updateProduct = async (id, body) => {
    try {
      const checkId = await ProductModel.findById(id)
      if (!checkId)
        return { success: false, message: "Product is not found" };

      const result = await ProductModel.update(id, body) 
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static getProductBySlug = async (req) => {
    const slug = req.params.slug;
    try {

      const product = await ProductModel.findBySlug(slug)
      if (!product)
        return { success: false, message: "Product is not found" };

      return product;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  static deleteProduct = async (req) => {
    const id = req.params.id;
    try {
      const deleteResult = await ProductModel.delete(id)
      if (deleteResult == 0)
        return { success: false, message: "Product is not found" };

      return { success: true, message: "Delete product successfully" }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
}

module.exports = ProductService;
