const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage({ fileSize: 1024 * 1024 * 10 });
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');

const ProductController = require("../controllers/ProductController");

router.post("/create", ProductController.create);
router.post("/delete", ProductController.delete);
router.post("/edit", ProductController.edit);
router.post("/get_image_by_product_id", ProductController.getImageByProductId);
router.post("/get_product_by_id", ProductController.getProductById);
router.post("/get_product_by_category", ProductController.getProductsByCategory);
router.post("/getnamebyid", ProductController.getNameById);

router.post('/img/create_image_by_product_id', ProductController.uploadImageByProductId);
router.post('/img/get_image_by_product_id', ProductController.getImageByProductId);

module.exports = router;