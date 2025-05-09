const express = require("express");

const { httpGetAllOrders, httpCheckoutOrder, httpCreateOrder, httpDeleteOrder, httpUpdateOrder, httpGetOrdersByVendor } = require('./orders.controller')



const OrdersRouter = express.Router()

OrdersRouter.get('/vendor/:vendorId', httpGetOrdersByVendor);
OrdersRouter.get('/', httpGetAllOrders);
OrdersRouter.post('/create', httpCreateOrder);
OrdersRouter.post('/update', httpUpdateOrder);
OrdersRouter.delete('/:id', httpDeleteOrder);
OrdersRouter.post('/checkout', httpCheckoutOrder);


module.exports = OrdersRouter;
