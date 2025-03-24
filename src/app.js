
// This file contains the main  express codes 
// Importing express



const express = require('express');

const app = express();
app.use(express.json());

app.use('/inventory', inventoryRouter);
app.use('/fertilizer-company', fertilizerCompanyRouter);

app.use('/customers', CustomerRouter);
app.use('/orders', OrderRouter);



app.use(session({
    secret: 'ecoHarvestSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set secure: true in production with HTTPS
}));

app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productsRoutes);

app.use((req, res) => {
    console.log(`404 Error: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app


