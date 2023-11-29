const express = require("express");
const router = express.Router();

router.use("/category", require("./CategoryRoutes"));
router.use("/product", require("./ProductRoutes"));
router.use("/admin", require("./AdminRoutes"));
router.use("/dashboard", require("./DashboardRoutes"));

module.exports = router;