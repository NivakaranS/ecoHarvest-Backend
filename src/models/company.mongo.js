const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pCategory: {
    type: String,
    required: true,
    enum: ["Dairy", "Meat", "Vegetable", "Bakery", "Other"],
  },
});

module.exports = mongoose.model("Company", companySchema);
