const express = require("express");
const router = express.Router();

router.use("/category", require("CategoryRoutes"));
router.use("/product", require("ProductRoutes"));

export default router;