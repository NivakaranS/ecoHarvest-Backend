
// This file contains the main  express codes 
// Importing express
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const CustomerRouter = require('./routes/customers/customers.router');
const OrderRouter = require('./routes/orders/orders.router');
const Cart = require('./routes/cart/cart.router');
const productCategoriesRouter = require('./routes/productCategories/productCategories.router');
const authRoutes = require('./routes/auth/auth.router')
const userRoutes = require('./routes/auth/user.router')
const inventoryRouter = require('./routes/inventory/inventory.router')
const fertilizerCompanyRouter = require('./routes/fertilizerCompany/fertilizerCompany.router')
const vendorRoutes = require('./routes/vendors/vendors.router')
const productRouter = require('./routes/products/products.router')
const reportRouter = require('./routes/pdf/pdf.router')

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));
app.use(express.json());
app.use(cookieParser())

app.use('/inventory', inventoryRouter);
app.use('/fertilizer-company', fertilizerCompanyRouter);


app.use('/productcategories', productCategoriesRouter);
app.use('/customers', CustomerRouter);
app.use('/orders', OrderRouter);
app.use('/cart', Cart);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);



app.use('/vendors', vendorRoutes);
app.use('/products', productRouter);
app.use('/report', reportRouter);



app.get('/check-cookie', (req, res) => {
    try {
        if (!req.cookies || Object.keys(req.cookies).length === 0) {
            return res.status(400).json({ message: 'No cookies found!' });
        }
        
        const token = req.cookies.token;
        const decoded = jwt.verify( token, process.env.JWT_SECRET)
    
        res.json({ role: decoded.role, id: decoded.id });
    } catch (err) {
        console.error("Error in checking cookie:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }



});

app.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ message: "Logged out successfully!" });
});




app.use((req, res) => {
    console.log(`404 Error: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app


