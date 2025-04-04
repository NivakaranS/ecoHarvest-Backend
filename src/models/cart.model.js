
const Cart = require('./cart.mongo');
const Product = require('./products.mongo');


const updateQuantity = async (cartId, productId, updatedQuantity) => {
    
    if (updateQuantity < 1) {
        return "Quantity must be at least 1";
    }
    
    const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        {
            $set: { "products.$[elem].quantity": updatedQuantity }
        },
        {
            arrayFilters: [{ "elem.productId": productId }],
            new: true 
        }
    )
    
    return updatedCart;
    
}

const addProductToCart = async (userId, quantity, productId) => {
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            const newCart = new Cart({ 
                userId, 
                products: [{productId, quantity} ] 
            });
            await newCart.save();
            return newCart;
        } else {
            const existingProduct = cart.products.find(p=> p.productId.toString() === productId);
            
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            
            await cart.save();
            return cart;
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
}

const deleteCartProduct = async (cartId, productId) => {
    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return "Cart not found"
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === String(productId));
        if (productIndex === -1) {
            return ('Product not found in cart');
        }

        cart.products.splice(productIndex, 1);
        await cart.save();
        return cart;
    } catch(err) {
        console.error('Error deleting product from cart:', err);
    }
}

const getCartByUserId = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId });

        const products = await Product.find({ _id: { $in: cart.products.map(p => p.productId) } });
        return {cart, products};
    } catch (error) {
        console.error('Error fetching cart by user ID:', error);
        
    }
}

module.exports = {
    addProductToCart,
    getCartByUserId,
    updateQuantity,
    deleteCartProduct
    
}

