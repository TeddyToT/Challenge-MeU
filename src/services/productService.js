const ProductModel = require("../models/productModel")

class ProductService {
  static async addProduct({ name, slug, quantity }) {

      const exists = await ProductModel.findBySlug(slug);
      if (exists)
        return {success: false, message: "Product slug already exists"}

      const product = await ProductModel.create({ name, slug, quantity });
      return product;

  }

  static getAllProduct = async () => {

      const products = await ProductModel.findAll();
      return products;

  };

  static getProductById = async (id) => {

      const product = await ProductModel.findById(id)
      if (!product) 
        return {success: false, message: "Product not found"}

      return product;
    
  };

  static updateProduct = async (id, updates) => {

      const checkId = await ProductModel.findById(id)
      if (!checkId)
        return {success: false, message: "Product not found"}

      const result = await ProductModel.update(id, updates) 
      return result;

  };

  static getProductBySlug = async (slug) => {

      const product = await ProductModel.findBySlug(slug)
      if (!product)
        return {success: false, message: "Product not found"}


      return product;

    
  };

  static deleteProduct = async (id) => {


      const deleteResult = await ProductModel.delete(id)
      if (deleteResult === 0)
        return {success: false, message: "Product not found"}

      return {success: true,message: "Delete product successfully" }

  };
}

module.exports = ProductService;
