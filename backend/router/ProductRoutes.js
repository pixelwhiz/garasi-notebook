const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.post("/create", ProductController.create);
router.post("/edit", ProductController.edit);

module.exports = router;