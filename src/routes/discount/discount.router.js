const express = require("express");
const {
  httpCreateDiscount,
  httpDeleteDiscount,
  httpGetAllDiscount,
  httpUpdateDiscount,
} = require("./discount.controller");
const discount = express.Router();

discount.post("/create", httpCreateDiscount);
discount.delete("/:id", httpDeleteDiscount);
discount.get("/", httpGetAllDiscount);
discount.post("/update", httpUpdateDiscount);

module.exports = discount;
