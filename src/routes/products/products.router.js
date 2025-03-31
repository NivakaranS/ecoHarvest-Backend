const express = require('express');

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, searchProducts } = require('./products.controller');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/search',searchProducts)

module.exports = router;