const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
        default: 'ORD1000'

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
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }, 
    orderTime: {
        type: Date,
        required: true
    }
});

// Connects ordersSchema to the 'Orders' collection in the database
module.exports = mongoose.model('Order', ordersSchema);
