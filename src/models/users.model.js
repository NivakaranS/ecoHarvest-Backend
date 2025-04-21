const User = require("./users.mongo");
const { createIndividualCustomer, createCompanyCustomer} = require("./customers.model");
const { createAdmin } = require("./admin.model");
const { createVendor} = require("./vendors.model");
const bcrypt = require("bcryptjs");


const registerIndividualCustomer = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customerId = await createIndividualCustomer({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address
    });

    const newUser = new User({
      username: data.username,
      password: hashedPassword,
      entityId: customerId,
      role: "Customer",
    });
    
    await newUser.save();
    return "User created successfully";
  
} catch (err) {
    console.log("Error in creating individual customer", err);
    return "Error in creating individual user";
  }

  
};



const registerCompanyCustomer = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        const companyId = await createCompanyCustomer({
            firstName: data.firstName,
            lastName: data.lastName,
            companyName: data.companyName,
            phoneNumber: data.phoneNumber, 
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            category: data.category,
            address: data.address
        });
    
        const newUser = new User({
          username: data.username,
          password: hashedPassword,
          entityId: companyId,
          role: "Customer",
        });
        
        await newUser.save();
        return "User created successfully";
      
    } catch (err) {
        console.log("Error in creating company customer", err);
        return "Error in creating company user";
    }
};

const registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = new User({
    username: data.username,
    password: hashedPassword,
    entityId:
      data.role === "Customer"
        ? await createCustomer(
            data.firstName,
            data.lastName,
            data.phoneNumber,
            data.email,
            data.dateOfBirth,
            data.gender,
            data.address
          )
        : await createAdmin(
            data.firstName,
            data.lastName,
            data.phoneNumber,
            data.email,
            data.dateOfBirth,
            data.gender,
            data.address
          ),
    role: data.role,
  });

  await newUser.save();
  return "User created successfully";
};


const registerVendor = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const vendorId = await createVendor({
      firstName: data.firstName,
      lastName: data.lastName,
      businessName: data.businessName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,

    })

    const newUser = new User({
      username: data.username,
      password: hashedPassword,
      entityId: vendorId,
      role: "Vendor",
    });

    await newUser.save();
    return "Vendor created successfully";
  } catch (err) {
    console.log("Error in creating vendor", err);
    return "Error in creating vendor ";
  }
};

const registerAdmin = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const adminId = await createAdmin({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender

    })

    const newUser = new User({
      username: data.username,
      password: hashedPassword,
      entityId: adminId,
      role: "Admin",
    });

    await newUser.save();
    return "User created successfully";
  } catch (err) {
    console.log("Error in creating admin", err);
    return "Error in creating admin user";
  }
};


module.exports = {
  registerUser,
  registerIndividualCustomer,
  registerCompanyCustomer,
  registerAdmin,
  registerVendor
};
