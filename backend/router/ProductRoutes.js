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
router.post("/get_product_by_category", ProductController.getProductsByCategory);
router.post("/getnamebyid", ProductController.getNameById);
router.post("/upload/image", upload.array("images"), (req, res) => {
    const imageUrls = req.files.map((file) => {
        const imageUrl = `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
        )}`;
        return imageUrl;
    });

    res.json({ imageUrls });
});

module.exports = router;