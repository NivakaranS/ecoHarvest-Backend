const Product = require('../../models/products.model');
const Inventory = require('../../models/inventory.model')


const createProduct = async (req, res) => {
    try {
        const { name, subtitle, quantity, unitPrice, foodCategory, productCategory, imageLink, inventoryId } = req.body;

        const inventory = await Inventory.findById(inventoryId);
        if (!inventory) {
            return res.status(400).json({ message: 'Invalid Inventory ID' });
        }

        const newProduct = new Product({
            name,
            subtitle,
            quantity,
            unitPrice,
            foodCategory,
            productCategory,
            imageLink,
            inventoryId,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchProducts = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { subtitle: { $regex: search, $options: 'i' } },
                { productCategory: { $regex: search, $options: 'i' } }
            ]
        }).populate('inventoryId')

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({ products });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Error searching products', error });
    }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct, searchProducts } ;