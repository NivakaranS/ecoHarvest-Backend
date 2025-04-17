const Discount = require("./discount.mongo");
const Product = require("./products.mongo");

async function createDiscount(data) {
  // Optional: Check if product exists before creating
  console.log(data.productId);
  const product = await Product.findById(data.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  console.log(data.percentage);
  return await Discount.create({
    percentage: data.percentage,
    category: data.category,
    status: data.status,
    //productCategory: data.productCategory,
    productId: data.productId,
  });
}
module.exports = { createDiscount };
