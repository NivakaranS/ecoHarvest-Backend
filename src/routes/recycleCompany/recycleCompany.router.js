const express = require("express");
const { httpCreateRecycleCompany } = require("./recycleCompany.controller");

const RecycleCompany = express.Router();

RecycleCompany.post("/create", httpCreateRecycleCompany);

module.exports = {
  RecycleCompany,
};
