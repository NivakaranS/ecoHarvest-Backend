const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  percentage: {
    type: Number,
    required: true,
  },
  catagery: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Discount", discountSchema);
