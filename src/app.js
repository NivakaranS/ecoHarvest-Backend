// This file contains the main  express codes and middlewares

// Importing express
const RecycleCompany = require("./routes/recycleCompany/recycleCompany.router");
const express = require("express");

const CustomerRouter = require("./routes/customers/customers.router");
const OrderRouter = require("./routes/orders/orders.router");

const app = express();
app.use(express.json());

app.use("/recycleCompany", RecycleCompany);

app.use("/customers", CustomerRouter);
app.use("/orders", OrderRouter);

module.exports = app;
