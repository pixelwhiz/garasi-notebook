const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

router.post("/create", CategoryController.create);
router.post("/delete", CategoryController.delete);
router.post("/getnamebyid", CategoryController.getNameById);
router.get("/get", CategoryController.getAllData);

module.exports = router;