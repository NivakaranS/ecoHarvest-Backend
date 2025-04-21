

const Vendor = require('./vendors.mongo');

const createVendor = async (data) => {
  try {
    const vendor = await Vendor.create({
        firstName: data.firstName,
        lastName: data.lastName,
        businessName: data.businessName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
    });

    return vendor._id;
  } catch (error) {
    console.error("Error creating Vendor:", error);
    
  }
};


module.exports = {
    createVendor
};