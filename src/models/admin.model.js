const Admin = require("./admin.mongo");

const createAdmin = async (data) => {
  try {
    const admin = await Admin.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
    });

    return admin._id;
  } catch (error) {
    console.error("Error creating admin:", error);
    
  }
};

module.exports = {
  createAdmin,
};
