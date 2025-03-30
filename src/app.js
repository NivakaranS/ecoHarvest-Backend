
// This file contains the main  express codes and middlewares
// Importing express
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const CustomerRouter = require('./routes/customers/customers.router');
const OrderRouter = require('./routes/orders/orders.router');
const productCategoriesRouter = require('./routes/productCategories/productCategories.router');
const authRoutes = require('./routes/auth/auth.router')
const userRoutes = require('./routes/auth/user.router')

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser())



app.use('/productcategories', productCategoriesRouter);
app.use('/customers', CustomerRouter);
app.use('/orders', OrderRouter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);




module.exports = app