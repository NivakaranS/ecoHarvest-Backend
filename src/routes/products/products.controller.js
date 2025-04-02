const Product = require('../../models/products.model');
const {getProductByCategoryId, getProductById, createProduct} = require('../../models/products.model')



const httpGetProductByCategoryId = async (req, res) => {
    
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        
        const products = await getProductByCategoryId(categoryId);
        if (!products) return res.status(404).json({ message: 'No products found for this category' });
        res.status(200).json(products);
    } catch (err) {
        console.error("Error in getting product by category ID", err)
        res.status(500).json({ message: err.message });
    }
}

const httpGetProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        const productDetails = await getProductById(id);

        return res.status(200).json(productDetails);
    } catch(err) {
        console.error("Error in getting product by ID", err)
        return res.status(500).json({ message: err.message });
    }
}


const httpCreateProduct = async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch(err) {
        console.error("Error in creating product", err)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update a product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { httpCreateProduct, httpGetProductByCategoryId, getProducts, httpGetProductById, updateProduct, deleteProduct } ;