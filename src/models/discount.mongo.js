const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    percentage: {
      type: Number,
      required: true,
    },
    catagery: {
      type: String,
      required: true,
      enum: ["Resell", "Recycle"],
    },
    status: {
      type: Boolean,
      required: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
