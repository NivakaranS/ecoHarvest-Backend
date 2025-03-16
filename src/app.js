
// This file contains the main  express codes and middlewares
// Importing express
const express = require('express');


const ordersRouter = require('./routes/orders/orders.router');
const app = express();

app.use(express.json());
app.use(ordersRouter)

module.exports = app