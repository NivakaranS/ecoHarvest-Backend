

const Customer = require('./customers.mongo');

async function createCustomer(data) {
    return await Customer.create({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender, 
        address: data.address,
        lastLogin: Date.now()
    })
}

async function findCustomer(query) {
    return await Customer.find({
        firstName: query
    })
}

async function updateCustomer(data) {
    return await Customer.find({
        _id: data.id
    }, data, {
        upsert: true
    } )
}

async function deleteCustomer(id) {
    return await Customer.deleteOne({
        _id: id
    })
}

async function getAllCustomers() {
    return await Customer.find({})
}


module.exports = {
    createCustomer,
    findCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers
}