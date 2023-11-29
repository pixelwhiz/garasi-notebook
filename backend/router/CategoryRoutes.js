const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

router.post("/create", CategoryController.create);
router.post("/delete", CategoryController.delete);
router.get("/get", CategoryController.getAllData);
router.post("/get_name_by_id", CategoryController.getNameById);

module.exports = router;