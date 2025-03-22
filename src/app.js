
// This file contains the main  express codes 
// Importing express
const inventoryRouter = require('./routes/inventory/inventory.router');  
const fertilizerCompanyRouter = require('./routes/fertilizercompany/fertilizercompany.router');  


const express = require('express');

const app = express();

app.use(express.json());


app.use('/api/inventory', inventoryRouter);

app.use('/api/fertilizer-company', fertilizerCompanyRouter);



module.exports = app