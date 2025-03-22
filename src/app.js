
// This file contains the main  express codes and middlewares
// Importing express
const express = require('express');

<<<<<<< HEAD

const ordersRouter = require('./routes/orders/orders.router');
const app = express();
=======
const CustomerRouter = require('./routes/customers/customers.router');
const OrderRouter = require('./routes/orders/orders.router');
>>>>>>> main

const app = express();
app.use(express.json());
app.use(ordersRouter)

app.use('/customers', CustomerRouter);
app.use('/orders', OrderRouter);





module.exports = app