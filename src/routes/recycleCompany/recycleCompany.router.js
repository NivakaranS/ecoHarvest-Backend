const express = require("express");
const {
  httpCreateRecycleCompany,
  httpDeleteRecycleCompany,
  httpUpdateRecycleCompany,
  httpGetAllRecycleCompany,
} = require("./recycleCompany.controller");

const RecycleCompany = express.Router();

RecycleCompany.post("/create", httpCreateRecycleCompany);
RecycleCompany.delete("/:id", httpDeleteRecycleCompany);
RecycleCompany.post("/update", httpUpdateRecycleCompany);
RecycleCompany.get("/", httpGetAllRecycleCompany);

module.exports = RecycleCompany;
