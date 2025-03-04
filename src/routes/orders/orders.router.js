
const express = require('express')

const ordersRouter = express.Router()

ordersRouter.get('/orders', getAllOrders)


module.exports = ordersRouter;
