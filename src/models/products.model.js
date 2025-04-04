const Product = require("./products.mongo");
const Vendor = require("./vendors.mongo");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const getAllProducts = async () => {
  try {
    const productsList = await Product.find({}).populate(
      "vendor",
      "businessName email phoneNumber"
    );
    return productsList;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const getProductsByCategory = async (category) => {
  try {
    const productsList = await Product.find({
      productCategory_id: category,
    }).populate("vendor", "businessName email phoneNumber");
    return productsList;
  } catch (err) {
    console.error("Error fetching products by category:", err);
  }
};
const getProductsBypCategory = async (pCategory) => {
  try {
    const productsList = await Product.find({
      pCategory,
      category: "Resell",
    })
      .sort([["unitPrice", "asc"]])
      .populate("vendorId", "businessName email phoneNumber");

    return productsList;
  } catch (err) {
    console.error("Error fetching products by category:", err);
    throw err;
  }
};
const getProductById = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID");
    }

    const productDetails = await Product.findById(productId).populate(
      "vendorId",
      "businessName email phoneNumber"
    );

    return productDetails;
  } catch (err) {
    console.error("Error fetching product by ID:", err);
  }
};
// const getProductById = async (productId) => {
//   try {
//     if (!productId) {
//       throw new Error("Product ID is required");
//     }

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       throw new Error("Invalid product ID");
//     }

//     const productDetails = await Product.find(
//       new mongoose.Types.ObjectId(productId)
//     );

//     return productDetails;
//   } catch (err) {
//     console.error("Error fetching product by ID:", err);
//   }
// };

const getProductByCategoryId = async (categoryId) => {
  try {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    const trimmedCategoryId = categoryId.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedCategoryId)) {
      throw new Error("Invalid category ID");
    }

    const productlist = await Product.find({
      productCategory_id: new mongoose.Types.ObjectId(trimmedCategoryId),
    }).populate("vendorId", "businessName email phoneNumber");

    return productlist;
  } catch (err) {
    console.error("Error fetching product by category ID:", err);
    return [];
  }
};

const createProduct = async (data) => {
  try {
    const product = await Product.create(data);
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

module.exports = {
  getProductByCategoryId,
  createProduct,
  getProductById,
  getProductsByCategory,
  getProductsBypCategory,
  getAllProducts,
};
