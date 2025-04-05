
const {register, login} = require('./auth.controller');
const {httpRegisterIndividualCustomer, httpRegisterAdmin, httpRegisterCompanyCustomer} = require('./auth.controller')

const express = require('express');

const Userrouter = express.Router();


Userrouter.post('/register', register)
Userrouter.post('/login', login)
Userrouter.post('/registerIndividualCustomer', httpRegisterIndividualCustomer)
Userrouter.post('/registerCompanyCustomer', httpRegisterCompanyCustomer)
Userrouter.post('/registerAdmin', httpRegisterAdmin)




module.exports = Userrouter;

