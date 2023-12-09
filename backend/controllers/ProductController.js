const db = require("../models/Index");
const {randomUUID, randomInt} = require("crypto");
const {Sequelize, DataTypes, UUIDV4, where} = require("sequelize");
const Product = db.product;
const Category = db.category;
const Image = db.image;
const {Op} = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const multer = require('multer');
const path = require('path');
const fs = require('fs');

exports.create = async (req, res) => {
    try {
        const { id, name, description, price, condition, category } = req.body;

        const existingProduct = await Product.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        if (!name || !description || !price || !condition || !category) {
            return res.status(401).send({ status: false, message: "Please complete data first" });
        }

        if (existingProduct) {
            return res.status(401).send({ status: false, message: "Product with that name is Already Exists!" });
        }

        let categoryInstance     = await Category.findOrCreate({
            where: { name: category },
            defaults: { total: 0 },
        });

        const categoryData = categoryInstance[0].dataValues;
        const updatedCategory = await Category.update(
            { total: categoryData.total + 1 },
            { where: { id: categoryData.id } }
        );

        if (updatedCategory[0] === 0) {
            return res.status(404).send({ status: false, message: "Category not found" });
        }

        await Product.create({
            id: id,
            name: name,
            price: price,
            condition: condition,
            description: description,
            category: category,
        });

        res.status(200).send({ status: true, message: "New product was Successfully added!" });
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, name, price, condition, description } = req.body;
        if (!id || !name || !price || !condition || !description) {
            return res.status(500).send({ status: false, message: "Dont empty the Data " });
        }

        const existingProduct = await Product.findOne({
            where: {
                id: id
            }
        });

        if (!existingProduct) {
            return res.status(401).send({ status: false, message: "Product with that ID not found!" });
        }

        await Product.update({
            name: name,
            price: price,
            condition: condition,
            description: description,
        }, {
            where: {
                id: {
                    [Op.eq]: id,
                }
            },
        });


        return res.status(200).send({ status: true, message: "Successfully updated the Product" });


    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;

        const existingProduct = await Product.findOne({
            where: {
                id: id
            }
        });

        if (!existingProduct) {
            return res.status(401).send({ status: false, message: "No products found with that ID" });
        }

        const category = existingProduct.category;
        await Product.destroy({
            where: {
                id: id,
            },
        });

        const updatedCategory = await Category.update(
            { total: Sequelize.literal('total - 1') },
            { where: { name: category } }
        );

        if (updatedCategory[0] === 0) {
            return res.status(404).send({ status: false, message: "Category not found" });
        }

        res.status(200).send({ status: true, message: `Product with ID ${id} was deleted successfully!` });
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const products = await Product.findAll({
            where: { category: category },
        });

        const productData = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            condition: product.condition,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }));

        res.json(productData);
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.body;

        const existingProduct = await Product.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        return res.status(200).send({ status: true,
            name: existingProduct.name,
            condition: existingProduct.condition,
            description: existingProduct.description,
            price: existingProduct.price });

    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};

exports.getNameById = async (req, res) => {
    try {
        const { id } = req.body;

        const existingProduct = await Product.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        return res.status(200).send({ status: true, name: existingProduct.name });

    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};

exports.getImageByProductId = async (req, res) => {
    try {
        const { id } = req.body;
        const images = await Image.findAll({
            where: { productId: id },
        });

        const imageData = images.map(image => ({
            id: image.id,
            productId: image.productId,
            filename: image.filename,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt
        }));

        res.json(productData);
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './db/img/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().split('T')[0];
        const extension = path.extname(file.originalname);
        const nameWithoutExtension = path.parse(file.originalname).name;
        const filename = `${date}-${nameWithoutExtension}-${uuidv4()}${extension}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

exports.uploadImageByProductId = async (req, res) => {
    try {
        const { id, productId } = req.body;

        await Image.create({
            id: id,
            productId: productId,
            name: 1,
        });

        res.status(200).send({ status: true, message: "Image upload successfully" });
    } catch (err) {
        console.error("Internal Server Error: ", err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.editImageByProductId = async(req, res) => {
    try {
        const { id } = req.body;

        const existingProduct = Product.findOne({
            where: {
                [Op.eq]: id
            }
        });

        if (!existingProduct) {
            return res.status(400).send({ status: false, message: "That Product is not found" });
        }

        res.status(200).send({ status: true, message: "Image was updated successfully" });

    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};

exports.getImageByProductId = async (req, res) => {
    try {
        const { id } = req.body;
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};