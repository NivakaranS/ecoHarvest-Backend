const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true
    }, 
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unitPrice: {
                type: Number,
                required: true
            }
        }
    ],
    orderDate: {
        type: Date, 
        required: true,
        default: Date.now
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    status: {
        type: String,
        required: true
    }, 
    orderTime: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Connects ordersSchema to the 'Orders' collection in the database
module.exports = mongoose.model('Order', ordersSchema);
