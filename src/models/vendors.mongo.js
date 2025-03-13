const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    businessName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String, enum: ['Restaurant', 'Bakery', 'Supplier', 'Waste Management'], required: true },
    status: { type: String, default: 'Active' },
    loyaltyPoints: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', vendorSchema);