
// This file contains the main  express codes 
// Importing express
const express = require('express');

const CustomerRouter = require('./routes/customers/customers.router');
const OrderRouter = require('./routes/orders/orders.router');

const app = express();
app.use(express.json());


app.use('/customers', CustomerRouter);
app.use('/orders', OrderRouter);





module.exports = app