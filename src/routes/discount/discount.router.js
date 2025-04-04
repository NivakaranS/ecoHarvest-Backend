const express = require("express");

const {
  httpCreateDiscount,
  httpGetAllDiscounts,
  httpUpdateDiscount,
  httpDeleteDiscount,
} = require("./discount.controller");

const DiscountRouter = express.Router();

DiscountRouter.post("/create", httpCreateDiscount);
DiscountRouter.get("/", httpGetAllDiscounts);
DiscountRouter.put("/update", httpUpdateDiscount);
DiscountRouter.delete("/delete/:id", httpDeleteDiscount);
module.exports = DiscountRouter;
