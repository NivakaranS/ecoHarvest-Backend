

const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
    }, 
    orderDate: {
        type: Date, 
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
})

//Connects ordersSchema to the 'Orders' collection in the database
module.exports = mongoose.model('Order', ordersSchema)
