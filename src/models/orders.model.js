

const orders = require('./orders.mongo');


const getAllOrders = async () => {
    return await orders.find({})
}

const createOrder = async (data) => {

    const numberOfOrders = await orders.countDocuments()

    return await orders.create({
        orderNumber: "ORD100" + (numberOfOrders+1),
        products : [{
            productId: data.productId,
            quantity: data.quantity,
            unitPrice: data.unitPrice
        }],
        orderTime: Date.now(),
        totalAmount: req.body.totalAmount,
        status: req.body.status
    })
}

const updateOrder = async (data) => {
    return await orders.find({
        _id: data.id
    }, data, {
        upsert: true
    } )
}

const deleteOrder = async (id) => {
    return await orders.deleteOne({
        _id: id
    })
}

module.exports = {
    getAllOrders,
    deleteOrder,
    updateOrder,
    createOrder
};