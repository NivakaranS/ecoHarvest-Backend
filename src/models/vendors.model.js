

const Vendor = require('./vendors.mongo');

const createVendor = async (data) => {
  try {
    const vendor = await Vendor.create({
        firstName: data.firstName,
        lastName: data.lastName,
        businessName: data.businessName,
        phoneNumber: data.phoneNumber,
        email: data.email,
    });

    return vendor._id.toString();
  } catch (error) {
    console.error("Error creating Vendor:", error);
    
  }
};


module.exports = {
    createVendor
};