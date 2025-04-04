const {
  createCompany,
  findCompany,
  updateCompany,
  deleteCompany,
  getAllCompany,
  findCompanyByCategory,
} = require("../../models/company.model");
const company = require("../../models/company.mongo");
const {
  getProductsByCategory,
  getProductsBypCategory,
} = require("../../models/products.model");
const httpGetAllCompanies = async (req, res) => {
  try {
    //console.log("get all companies");
    return res.status(200).send(await getAllCompany());
    // return res.status(200).json({ message: "success" });
  } catch (err) {
    //console.log("error get all companies");
    return res
      .status(500)
      .send({ message: "Error in getting all companies", error: err.message });
  }
};

const httpCreateCompany = async (req, res) => {
  try {
    return res.status(201).json(await createCompany(req.body));
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error in creation companies", error: err.message });
  }
};

const httpUpdateCompany = async (req, res) => {
  try {
    const updatedCompany = await updateCompany(req.body);
    if (!updatedCompany) {
      return res.status(404).send({ message: "Company not found" });
    }
    return res.status(200).json(updatedCompany);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error in updating company", error: err.message });
  }
};

const httpDeleteCompany = async (req, res) => {
  try {
    return res.status(200).json(await deleteCompany(req.params.id));
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error in Deleting companies", error: err.message });
  }
};

const httpFindCompany = async (req, res) => {
  try {
    return res.status(200).json(await findCompany(req.query.companyName));
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error in finding companies", error: err.message });
  }
};

const httpGetCompanyFoodListing = async (req, res) => {
  try {
    const category = req.body.pCategory;
    const companies = await findCompanyByCategory(category);
    console.log("companies", companies);
    //res.json(companies);
    const matchedProducts = await getProductsBypCategory(companies.pCategory);
    console.log("matchedProducts", matchedProducts);
    res.json(matchedProducts);
  } catch (error) {
    console.error("Error fetching company food listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  httpCreateCompany,
  httpUpdateCompany,
  httpDeleteCompany,
  httpFindCompany,
  httpGetAllCompanies,
  httpGetCompanyFoodListing,
};
