

const products = require('./products.mongo');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');

const getAllProducts = async () => {
    try {
        const productsList = await products.find({});
        return productsList;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

const getProductsByCategory = async (category) => {
    try {
        const productsList = await products.find({ productCategory_id: category });
        return productsList;
    } catch(err) {
        console.error('Error fetching products by category:', err);
        
    }
}

const getProductById = async (productId) => {
    try {
        if (!productId) {
            throw new Error('Product ID is required');
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('Invalid product ID');
        }

        const productDetails = await products.find(new mongoose.Types.ObjectId(productId));
       
        return productDetails;
    } catch(err) {
        console.error('Error fetching product by ID:', err);
        
    }
}


const getProductByCategoryId = async (categoryId) => {
    try {
        if (!categoryId) {
            throw new Error('Category ID is required');
        }


        const trimmedCategoryId = categoryId.trim();


        if (!mongoose.Types.ObjectId.isValid(trimmedCategoryId)) {
            throw new Error('Invalid category ID');
        }

 
        const productlist = await products.find({
            productCategory_id: new mongoose.Types.ObjectId(trimmedCategoryId)
        });

        
        return productlist;
    } catch(err) {
        console.error('Error fetching product by category ID:', err);
        return [];
    }
};


const createProduct = async (data) => {
    
    const product = await products.create(data);
    return product;
   
};


module.exports = {
    getProductByCategoryId,
    createProduct,
    getProductById
};