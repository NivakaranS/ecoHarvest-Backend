const express = require('express');
const verifyToken = require('../authMiddleware/authMiddleware');

const { registerVendor, getVendorById, updateVendor, deleteVendor, loginVendor } = require('./vendors.controller');

const router = express.Router();

router.post('/login', loginVendor);
router.post('/register', registerVendor);
router.get('/:id', verifyToken, getVendorById);
router.put('/:id', verifyToken, updateVendor);  
router.delete('/:id', verifyToken, deleteVendor);

module.exports = router;
