const {
  httpCreateCompany,
  httpUpdateCompany,
  httpDeleteCompany,
  httpFindCompany,
  httpGetAllCompanies,
  httpGetCompanyFoodListing,
} = require("./company.controller");
const authenticate = require("../authMiddleware/authMiddleware");
const express = require("express");
const verifyToken = require("../authMiddleware/authMiddleware");

const CompanyRouter = express.Router();

CompanyRouter.get("/", httpGetAllCompanies);
CompanyRouter.post("/create", httpCreateCompany);
CompanyRouter.put("/update", httpUpdateCompany);
CompanyRouter.delete("/:id", httpDeleteCompany);
CompanyRouter.get("/:companyName", httpFindCompany);
CompanyRouter.post(
  "/company-food-listing",
  verifyToken,
  httpGetCompanyFoodListing
);

module.exports = CompanyRouter;
