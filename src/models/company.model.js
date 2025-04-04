const company = require("./company.mongo");

async function createCompany(data) {
  return await company.create({
    firstName: data.firstName,
    lastName: data.lastName,
    companyName: data.companyName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    pCategory: data.pCategory,
    lastLogin: Date.now(),
  });
}

async function findCompany(query) {
  return await company.find({
    companyName: query,
  });
}

async function findCompanyByCategory(query) {
  return await company.find({
    pCategory: query,
  });
}

async function updateCompany(data) {
  const updatedCompany = await company.findByIdAndUpdate(data.id, data, {
    new: true,
    upsert: true,
  });
  return updatedCompany;
}

async function deleteCompany(id) {
  return await company.deleteOne({
    _id: id,
  });
}

async function getAllCompany() {
  console.log("getAllCompany");
  return await company.find({});
}

module.exports = {
  createCompany,
  findCompany,
  updateCompany,
  deleteCompany,
  getAllCompany,
  findCompanyByCategory,
};
