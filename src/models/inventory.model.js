const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productName: { type: String, required: true }, 
    category: { type: String, enum: ['Resale', 'Recycle', 'Fertilizer'], required: true }, 
    quantity: { type: Number, required: true }, 
    vendorName: { type: String, required: true }, 
    collectedTime: { type: Date, default: Date.now }, 
    status: { type: String, enum: ['Active', 'Dispatched'], default: 'Active' }, 
    dispatchedTime: { type: Date }, 
    collectedFertilizerCompany: { type: String }
});

const Inventory = mongoose.model('Inventory', inventorySchema );
module.exports = Inventory;

