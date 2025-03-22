

const { getAllOrders, deleteOrder, updateOrder, createOrder } = require('../../models/orders.model')

async function httpGetAllOrders(req, res) {
    try {
        return res.status(200).json(await getAllOrders());
    } catch(err) {
        console.error("Error in getting all orders", err);
    }
}

<<<<<<< HEAD
module.exports = {
    getAllOrders
}
=======
async function httpCreateOrder(req, res) {
    try{
        return res.status(200).json(await createOrder(req.body));
    } catch(err) {
        console.error("Error in creating order", httpCreateOrder)
    }
}

async function httpDeleteOrder(req, res) {
    try {
        return res.status(200).json(await deleteOrder(req.body))
    } catch(err) {
        console.error("Error in deleting order", err)
    }
}

async function httpUpdateOrder(req, res) {
    try {
        return res.status(200).json(await updateOrder(req.body))
    } catch(err) {
        console.error("Error in updating order", err)
    }
}



module.exports = {
    httpCreateOrder,
    httpUpdateOrder,
    httpDeleteOrder,
    httpGetAllOrders
};
>>>>>>> main
