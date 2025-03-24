const { createRecycleCompany } = require("../../models/recycleCom.model");

const httpCreateRecycleCompany = async (req, res) => {
  try {
    return res.status(200).json(await createRecycleCompany);
  } catch (err) {
    return res.status(400).json("Error in creating company: ", err);
  }
};

module.exports = {
  httpCreateRecycleCompany,
};
