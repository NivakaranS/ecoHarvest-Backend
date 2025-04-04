const Discount = require("./discount.mongo");
const Product = require("./products.mongo");

// Create a new discount
async function createDiscount(data) {
  // Optional: Check if product exists before creating
  const product = await Product.findById(data.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  return await Discount.create({
    percentage: data.percentage,
    category: data.category,
    status: data.status,
    productCategory: data.productCategory,
    productId: data.productId,
  });
}
// Find discounts by category, status, or other query
async function findDiscount(query) {
  return await Discount.find(query);
}

// Update discount using ID
async function updateDiscount(data) {
  if (!data.id) {
    throw new Error("Discount ID is required to update");
  }

  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(
      data.id,
      {
        percentage: data.percentage,
        category: data.category,
        status: data.status,
        productCategory: data.productCategory,
        productId: data.productId,
      },
      { new: true, upsert: false }
    );

    if (!updatedDiscount) {
      throw new Error("Discount not found");
    }

    return updatedDiscount;
  } catch (err) {
    console.error("Error updating discount:", err.message);
    throw new Error("Failed to update discount: " + err.message);
  }
}

async function deleteDiscount(id) {
  if (!id) {
    throw new Error("Discount ID is required to delete");
  }

  try {
    // Use `findByIdAndDelete` to remove the discount
    const deletedDiscount = await Discount.findByIdAndDelete(id);

    if (!deletedDiscount) {
      throw new Error("Discount not found");
    }

    return deletedDiscount; // Return the deleted discount document
  } catch (err) {
    console.error("Error deleting discount:", err.message);
    throw new Error("Failed to delete discount: " + err.message);
  }
}

// Get all discounts
async function getAllDiscount() {
  return await Discount.find({}).populate("productId");
}

module.exports = {
  createDiscount,
  findDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscount,
};
