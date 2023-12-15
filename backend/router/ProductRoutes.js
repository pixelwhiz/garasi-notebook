const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const db = require("../models");
const Category = db.category;

const ProductController = require("../controllers/ProductController");

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            const folderPath = `./db/img/${req.body.category}/`;

            if (!req.body.category) {
                return cb(new Error("Category not found"));
            }

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            const categoryExists = await Category.findOne({
                where: {
                    name: req.body.category,
                },
            });

            if (!categoryExists) {
                return cb(new Error("Category not found"));
            }

            cb(null, folderPath);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${uuidv4()}_${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
}).array('images');


router.post("/create", upload, ProductController.create);
router.post("/delete", ProductController.delete);
router.post("/edit", upload, ProductController.edit);
router.post("/get_image_by_product_id", ProductController.getImageByProductId);
router.post("/get_product_by_id", ProductController.getProductById);
router.post("/get_product_by_category", ProductController.getProductsByCategory);
router.post("/getnamebyid", ProductController.getNameById);

router.post('/img/create_image_by_product_id', upload, ProductController.uploadImageByProductId);
router.post('/img/get_image_by_product_id', ProductController.getImageByProductId);

module.exports = router;