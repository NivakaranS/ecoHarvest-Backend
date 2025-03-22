const express = require("express");




const { httpGetAllOrders, httpCreateOrder, httpDeleteOrder, httpUpdateOrder } = require('./orders.controller')


const express = require('express')

const OrdersRouter = express.Router()

OrdersRouter.get('/', httpGetAllOrders);
OrdersRouter.post('/create', httpCreateOrder);
OrdersRouter.post('/update', httpUpdateOrder);
OrdersRouter.delete('/:id', httpDeleteOrder);


ordersRouter.get("/orders", getAllOrders);

module.exports = OrdersRouter;
