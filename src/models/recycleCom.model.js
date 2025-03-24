const RecycleCompany = require("./recycleCom.mongo");

const createRecycleCompany = async (data) => {
  return await RecycleCompany.create({
    firstName: data.firstName,
    lastName: data.lastName,
    companyName: data.companyName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    category: data.category,
  });
};

module.exports = {
  createRecycleCompany,
};
