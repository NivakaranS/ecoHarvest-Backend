

const Orders = require('./orders.mongo');
const Cart = require('./cart.mongo')


const getAllOrders = async () => {
    return await Orders.find({})
}

const createOrder = async (data) => {

    const numberOfOrders = await Orders.countDocuments()

    return await Orders.create({
        orderNumber: "ORD100" + (numberOfOrders+1),
        products : [{
            productId: data.productId,
            quantity: data.quantity,
            unitPrice: data.unitPrice
        }],
        orderTime: Date.now(),
        totalAmount: req.body.totalAmount,
        status: req.body.status
    })
}

const updateOrder = async (data) => {
    return await Orders.find({
        _id: data.id
    }, data, {
        upsert: true
    } )
}

const deleteOrder = async (id) => {
    return await Orders.deleteOne({
        _id: id
    })
}

const checkoutOrder = async (data) => {
    
    try {
        

        
        const checkoutCart = await Cart.find({_id: data.cart._id})

        if (!checkoutCart) throw new Error("Cart not found")

      
        console.log("Checkout Cart", checkoutCart)

        console.log("Total Amount", data.cart.totalAmount)
        
        const order = Orders.create({
            userId: data.cart.userId,
            orderNumber: data.cart._id,
            products: checkoutCart[0].products.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.price
            })),
            totalAmount: data.cart.totalAmount,
            status: "Pending Payment",
            
        })

        await Cart.deleteOne({
            _id: data.cart._id
        })

        return order
        
    } catch(err) {
        console.log("Error in creating order", err)        
    }

}

const getAllOrdersByVendor = async (vendorId) => {
    return await Orders.find({
      products: {
        $elemMatch: {
          productId: {
            $in: await getProductIdsByVendor(vendorId)
          }
        }
      }
    }).populate('products.productId');
  };

  const getProductIdsByVendor = async (vendorId) => {
    const products = await require('./products.mongo').find({ vendorId: vendorId });
    return products.map(p => p._id);
  };

module.exports = {
    getAllOrders,
    deleteOrder,
    updateOrder,
    createOrder,
    checkoutOrder,
    getAllOrdersByVendor 
};