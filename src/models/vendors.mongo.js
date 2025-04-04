const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  businessName: { type: String, required: true },
  pCategory: {
    type: String,
    required: true,
    enum: ["Dairy", "Meat", "Vegetable", "Bakery", "Other"],
  },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: {
    type: String,
    enum: ["Restuarant", "Bakery", "Supplier", "Waste Management"],
    required: true,
  },
  status: { type: String, default: "Active" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vendor", vendorSchema);
