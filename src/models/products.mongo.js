const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    foodCategory: { type: String, required: true },
    productCategory: { type: String, required: true },
    imageLink: { type: String, required: true },
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
    createdTimestamp: { type: Date, default: Date.now },
    updatedTimestamp: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Product', productSchema);