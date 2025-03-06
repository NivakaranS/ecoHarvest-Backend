
const express = require('express')

const ordersRouter = express.Router()
const {getAllOrders} = require('../orders.controller')

ordersRouter.get('/orders', getAllOrders)


module.exports = ordersRouter;
