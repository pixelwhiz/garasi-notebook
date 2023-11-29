const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");

router.post("/login", AdminController.login);
router.post("/logout", AdminController.logout);
router.get("/check", AdminController.check);

module.exports = router;