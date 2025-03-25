const {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getAllDiscount,
} = require("../../models/discount.model");

const httpCreateDiscount = async (req, res) => {
  try {
    return res.status(200).json(await createDiscount);
  } catch (error) {
    return res.status(400).json("Error in creating discount: ", error);
  }
};
const httpDeleteDiscount = async (req, res) => {
  try {
    return res.status(200).json(await deleteDiscount);
  } catch (error) {
    return res.status(400).json("Error in deletion: ", error);
  }
};
const httpGetAllDiscount = async (req, res) => {
  try {
    return res.status(200).json(await getAllDiscount);
  } catch (error) {
    return res.status(400).json("Error in getiing discounts: ", error);
  }
};
const httpUpdateDiscount = async (req, res) => {
  try {
    return res.status(200).json(await updateDiscount);
  } catch (error) {
    return res.status(400).json("Error in Update: ", error);
  }
};
module.exports = {
  httpCreateDiscount,
  httpDeleteDiscount,
  httpGetAllDiscount,
  httpUpdateDiscount,
};
