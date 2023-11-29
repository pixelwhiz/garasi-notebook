const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.post("/create", ProductController.create);
router.post("/edit", ProductController.edit);
router.post("/get_product_by_category", ProductController.getProductsByCategory);

module.exports = router;