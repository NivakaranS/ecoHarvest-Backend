

const Customer = require('./customers.mongo');
const Individual = require('./individual.mongo');
const Company = require('./company.mongo');
const User = require('./users.mongo')


const getCustomerDetailsById = async (id) => {
  try {
    const cleanId = id.replace(/^:/, '').trim(); // remove leading colon and trim whitespace
    const user = await User.findById(cleanId);

    
    if (!user) {
      console.error("User not found");
      return null;
    }


    const customer = await Customer.findById(user.entityId);

    if(!customer) {
        console.error("Customer not found");
        return null;
    }

    if(customer.type === 'Individual') {
        const individual = await Individual.findById(customer.customerId);
        return [user, customer,  individual];
    } else if(customer.type === 'Company') {
        const company = await Company.findById(customer.customerId);
        return [user, customer, company];
    } else {
        console.error("Customer type not found");
        return 'Customer not found';
    }

  } catch (err) {
    console.error("Error fetching customer by ID:", err);
    return null;
  }
};


async function createIndividualCustomer(data) {
    let individual;

    try {
        const individual = await Individual.create({
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            address: data.address
        });

        const customer = await Customer.create({
            type: 'Individual',
            customerId: individual._id
        });


        return customer._id

    } catch(err) {
        console.log("Error in creating individual customer", err)
        if (individual) {
            await Individual.deleteOne({ _id: individual._id })
                .catch(cleanupErr => 
                    console.error("Cleanup failed:", cleanupErr)
                );
        }
        throw new Error(`Failed to create customer: ${err.message}`);
    }   
}


async function createCompanyCustomer(data) {
    try {
        const company = await Company.create({
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

        const customer = await Customer.create({
            type: 'Company',
            customerId: company._id
        });


        return customer._id

    } catch(err) {
        console.log("Error in creating individual customer", err)
    }
}

async function findCustomer(query) {
    return await Customer.find({
        firstName: query
    })
}

async function updateCustomer(data) {
    return await Customer.find({
        _id: data.id
    }, data, {
        upsert: true
    } )
}

async function deleteCustomer(id) {
    return await Customer.deleteOne({
        _id: id
    })
}

async function getAllCustomers() {
    return await Customer.find({})
}


module.exports = {
    createIndividualCustomer,
    createCompanyCustomer,
    findCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerDetailsById
}