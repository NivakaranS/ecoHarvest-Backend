const {
  createDiscount,
  findDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscount,
} = require("../../models/discount.model");
const httpUpdateDiscount = async (req, res) => {
  try {
    const updatedDiscount = await updateDiscount(req.body);
    if (!updatedDiscount) {
      return res.status(404).send({ message: "Discount not found" });
    }
    return res.status(200).json(updatedDiscount);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error in updating Discount", error: err.message });
  }
};

const httpCreateDiscount = async (req, res) => {
  try {
    return res.status(201).json(await createDiscount(req.body));
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in creation companies", error: error.message });
  }
};
const httpGetAllDiscounts = async (req, res) => {
  try {
    return res.status(201).send(await getAllDiscount());
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in creation companies", error: error.message });
  }
};
const httpDeleteDiscount = async (req, res) => {
  const { id } = req.params; // Assuming the ID is passed as a URL parameter

  try {
    const deletedDiscount = await deleteDiscount(id); // Call the delete function with the ID
    return res.status(200).json({
      message: "Discount deleted successfully",
      deletedDiscount,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error deleting discount",
      error: err.message,
    });
  }
};

module.exports = {
  httpCreateDiscount,
  httpGetAllDiscounts,
  httpUpdateDiscount,
  httpDeleteDiscount,
};
