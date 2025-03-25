const {
  createRecycleCompany,
  deleteRecycleCompany,
  updateRecycleCompany,
  getAllRecycleCompany,
} = require("../../models/recycleCom.model");

const httpCreateRecycleCompany = async (req, res) => {
  try {
    return res.status(200).json(await createRecycleCompany);
  } catch (err) {
    return res.status(400).json("Error in creating company: ", err);
  }
};
const httpDeleteRecycleCompany = async (req, res) => {
  try {
    return res.status(200).json(await deleteRecycleCompany(req.body));
  } catch (error) {
    console.error("Error in deletion", error);
  }
};
const httpUpdateRecycleCompany = async (req, res) => {
  try {
    return res.status(200).json(await updateRecycleCompany(req.body));
  } catch (err) {
    console.error("Error in updating order", err);
  }
};
const httpGetAllRecycleCompany = async (req, res) => {
  try {
    return res.status(200).json(await getAllRecycleCompany());
  } catch (error) {
    console.error("Error in getting all orders", error);
  }
};

module.exports = {
  httpCreateRecycleCompany,
  httpDeleteRecycleCompany,
  httpUpdateRecycleCompany,
  httpGetAllRecycleCompany,
};
