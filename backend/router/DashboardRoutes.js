const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/DashboardController");

router.get("/get", DashboardController.getAllData);
// router.post("/addvisitor", DashboardController.addVisitor);
router.post("/addorder", DashboardController.addOrder);
router.post("/addproduct", DashboardController.addProduct);

module.exports = router;