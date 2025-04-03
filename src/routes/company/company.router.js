const {
  httpCreateCompany,
  httpUpdateCompany,
  httpDeleteCompany,
  httpFindCompany,
  httpGetAllCompanies,
} = require("./company.controller");

const express = require("express");

const CompanyRouter = express.Router();

CompanyRouter.get("/", httpGetAllCompanies);
CompanyRouter.post("/create", httpCreateCompany);
CompanyRouter.post("/update", httpUpdateCompany);
CompanyRouter.delete("/:id", httpDeleteCompany);
CompanyRouter.get("/:firstName", httpFindCompany);

module.exports = CompanyRouter;
