const discount = require("./discount.mongo");

const createDiscount = async (data) => {
  return await discount.create({
    percentage: data.percentage,
    catagery: data.catagery,
    status: data.status,
  });
};

module.exports = {
  createDiscount,
};
