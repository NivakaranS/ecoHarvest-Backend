const express = require('express');
const verifyToken = require('../authMiddleware/authMiddleware');

const { registerVendor, getVendorById, updateVendor, deleteVendor, loginVendor } = require('./vendors.controller');

const router = express.Router();

router.get('/:id', getVendorById);
router.put('/:id', updateVendor);  
router.delete('/:id', deleteVendor);

module.exports = router;
