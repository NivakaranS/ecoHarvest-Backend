const express = require('express');
const verifyToken = require('../authMiddleware/authMiddleware');

const {getVendorById, updateVendor, deleteVendor} = require('./vendors.controller');

const router = express.Router();


router.get('/:id', verifyToken, getVendorById);
router.put('/:id', verifyToken, updateVendor);  
router.delete('/:id', verifyToken, deleteVendor);

module.exports = router;
