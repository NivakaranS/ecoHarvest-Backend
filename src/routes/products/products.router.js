const express = require("express");

const {
  httpCreateProduct,
  httpGetProductById,
  httpGetProductByCategoryId,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("./products.controller");

const router = express.Router();

router.get("/category/:categoryId", httpGetProductByCategoryId);

router.post("/create", httpCreateProduct);
router.get("/", getProducts);
router.get("/:id", httpGetProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
