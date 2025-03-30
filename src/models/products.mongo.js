const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productId: 
    { type: String, 
        required: true, 
        unique: true 
    },
    vendorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vendor', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    unitPrice: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['Resell', 'Recycling', 'Fertilizer'], 
        required: true 
    },
    productCategory: { 
        type: String, 
        enum: ['Dairy', 'Meat', 'Vegetable', 'Bakery', 'Other'], 
        required: true 
    },
    expirationDate: { 
        type: Date, 
        required: true 
    },
    image: { 
        type: String 
    },
    status: { 
        type: String,
         default: 'Available' 
     },
    bulkUpload: { 
        type: Boolean, 
        default: false 
    },
    autoExpireAlert: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Product', productSchema);