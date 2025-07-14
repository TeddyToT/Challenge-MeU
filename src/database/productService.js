const productModel = require("../models/productModel");


class ProductService {
  static async addProduct({ name, slug, quantity }){
    
    try {
      const product = await productModel.findOne({ name }).lean();

      if (product) {
        return { success: false, message: "Product already exists" };
      }

      if (!name) {
        return { success: false, message: "Name is required" };
      }

      if (!slug) {
        return { success: false, message: "Slug is required" };
      }


      const newProduct = new productModel({
        name,
        slug,
        quantity,
      });

      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static getAllProduct = async () => {
    try {
      const products = await productModel.find({});
      return products;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  static getProductById = async (req) => {
    const id = req.params.id
    try {
      const product = await productModel.findById(id);

      if (!product) {
        return {
          success: false,
          message: "wrong product",
        };
      }

      return product;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  static updateProduct = async (id, body) => {
    try {
        const { name, slug, quantity } = body;
        const product = await productModel.findById(id);
        if (!product) return { success: false, message: "Product not found" };

        if (slug) {
            const existProduct = await productModel.findOne({ slug });
            if (existProduct && existProduct.id.toString() !== id) {
                return { success: false, message: "Product slug already exists" };
            }
            product.slug = slug;
        }

        

        if (name) product.name = name;
        if (quantity) product.quantity = quantity;

        const savedProduct = await product.save();

        return savedProduct;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

static getProductBySlug = async (req) => {
    const slug = req.params.slug
    try {
      const product = await productModel
        .findOne({ slug })

      if (!product) {
        return {
          success: false,
          message: "wrong product",
        };
      }

      return product;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  static deleteProduct = async (req) => {
    const id = req.params.id
    try {
      const product = await productModel.findById(id);

      if (!product) {
        return {
          success: false,
          message: "Product not found",
        };
      }

      await productModel.findByIdAndDelete(id);


      return {
        success: true,
        message: "Delete product successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };


}

module.exports = ProductService