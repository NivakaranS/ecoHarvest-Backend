
// This file contains the main  express codes 
// Importing express
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const CustomerRouter = require('./routes/customers/customers.router');
const OrderRouter = require('./routes/orders/orders.router');
const productCategoriesRouter = require('./routes/productCategories/productCategories.router');
const authRoutes = require('./routes/auth/auth.router')
const userRoutes = require('./routes/auth/user.router')
const inventoryRouter = require('./routes/inventory/inventory.router')
const fertilizerCompanyRouter = require('./routes/fertilizerCompany/fertilizerCompany.router')
const vendorRoutes = require('./routes/vendors/vendors.router')
const productsRoutes = require('./routes/products/products.router')

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use('/inventory', inventoryRouter);
app.use('/fertilizer-company', fertilizerCompanyRouter);


app.use('/productcategories', productCategoriesRouter);
app.use('/customers', CustomerRouter);
app.use('/orders', OrderRouter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);



app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productsRoutes);

app.use((req, res) => {
    console.log(`404 Error: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app


