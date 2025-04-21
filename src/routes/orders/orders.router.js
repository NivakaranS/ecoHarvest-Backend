const express = require("express");

const { httpGetAllOrders, httpCheckoutOrder, httpCreateOrder, httpDeleteOrder, httpUpdateOrder } = require('./orders.controller')



const OrdersRouter = express.Router()

OrdersRouter.get('/', httpGetAllOrders);
OrdersRouter.post('/create', httpCreateOrder);
OrdersRouter.post('/update', httpUpdateOrder);
OrdersRouter.delete('/:id', httpDeleteOrder);
OrdersRouter.post('/checkout', httpCheckoutOrder);


module.exports = OrdersRouter;
