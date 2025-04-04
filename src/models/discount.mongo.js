const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    percentage: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Resell", "Recycle"],
    },
    status: {
      type: Boolean,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
      enum: ["Dairy", "Meat", "Vegetable", "Bakery", "Other"],
    },

    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Discount", discountSchema);
