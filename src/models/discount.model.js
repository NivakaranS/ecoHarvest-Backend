const discount = require("./discount.mongo");

const createDiscount = async (data) => {
  return await discount.create({
    percentage: data.percentage,
    catagery: data.catagery,
    status: data.status,
  });
};
const deleteDiscount = async (id) => {
  return await discount.deleteOne({
    _id: id,
  });
};
const updateDiscount = async (data) => {
  return await discount.find(
    {
      _id: data.id,
    },
    data,
    {
      upsert: true,
    }
  );
};
const getAllDiscount = async () => {
  return await discount.find({});
};
module.exports = {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getAllDiscount,
};
