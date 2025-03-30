const express = require('express');

const { registerVendor, getVendorById, updateVendor, deleteVendor, loginVendor } = require('./vendors.controller');

const router = express.Router();

// POST route for login
router.post('/login', loginVendor);

// Route to register a new vendor
router.post('/register', registerVendor);

// Route to get a vendor by ID
router.get('/:id', getVendorById);

// Route to update a vendor
router.put('/:id', updateVendor);

// Route to delete a vendor
router.delete('/:id', deleteVendor);

module.exports = router;
