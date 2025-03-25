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
const deleteRecycleCompany = async (id) => {
  return await RecycleCompany.deleteOne({
    _id: id,
  });
};
const updateRecycleCompany = async (data) => {
  return await RecycleCompany.find(
    {
      _id: data.id,
    },
    data,
    { upsert: true }
  );
};
const getAllRecycleCompany = async () => {
  return await RecycleCompany.find({});
};

module.exports = {
  createRecycleCompany,
  deleteRecycleCompany,
  updateRecycleCompany,
  getAllRecycleCompany,
};
