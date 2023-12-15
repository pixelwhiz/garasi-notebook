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
const fs = require('fs').promises;


exports.create = async (req, res) => {
    try {
        const { id, name, description, price, condition, category } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(500).send({ status: false, message: "No files found" });
        }

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
            return res.status(401).send({ status: false, message: "Product with that name already exists!" });
        }

        let categoryInstance = await Category.findOrCreate({
            where: { name: category },
            defaults: { total: 0 },
        });

        const uploadPromises = files.map(async (file) => {
            const newImage = await Image.create({
                productId: id,
                filename: file.filename,
            });
            return newImage;
        });

        const uploadedImages = await Promise.all(uploadPromises);

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
            image: uploadedImages[0].filename,
        });

        res.status(200).send({ status: true, message: "New product was successfully added!", images: uploadedImages });
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, name, price, condition, description } = req.body;
        const files = req.files;

        if (!id || !name || !price || !condition || !description) {
            return res.status(401).send({ status: false, message: "Don't leave the data empty" });
        }

        if (!req.body.images && typeof req.body.images === 'string') {
            return res.status(401).send({ status: false, message: "Dont leave data empty" });
        }

        const existingProduct = await Product.findOne({
            where: {
                id: id,
            },
        });

        if (!existingProduct) {
            // AGAR TIDAK TERJADI SPAM TAMBAH DATA
            req.files.forEach(async (file) => {
                const imagePath = path.join(__dirname, `../db/img/${req.body.category}/`, file.filename);
                try {
                    await fs.access(imagePath, fs.constants.F_OK);
                    await fs.unlink(imagePath);
                    console.log("File deleted:", imagePath);
                } catch (error) {
                    if (error.code === 'ENOENT') {
                        console.log("File does not exist:", imagePath);
                    } else {
                        console.error("Error deleting file:", error);
                        throw error;
                    }
                }
            });
            return res.status(401).send({ status: false, message: "Product with that ID not found!" });
        }

        const existingImages = await Image.findAll({
            where: {
                productId: id,
            },
        });
        const deletionPromises = existingImages.map(async (image) => {
            const imagePath = path.join(__dirname, `../db/img/${req.body.category}/`, image.filename);
            try {
                if (typeof req.body.images === 'string') {
                    console.log("URL detected, skipping file deletion:", req.body.images);
                } else {
                    await fs.access(imagePath, fs.constants.F_OK);
                    await fs.unlink(imagePath);
                    await Image.destroy({
                        where: {
                            productId: id,
                        },
                    });
                }
                console.log("File deleted:", imagePath);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.log("File does not exist:", imagePath);
                } else {
                    console.error("Error deleting file:", error);
                    throw error;
                }
            }
        });

        await Promise.all(deletionPromises);
        let uploadedImages = [];
        if (files && files.length > 0) {
            const uploadPromises = files.map(async (file) => {
                const newImage = await Image.create({
                    productId: id,
                    filename: file.filename,
                });
                return newImage;
            });

            const uploadedImages = await Promise.all(uploadPromises);
            await Product.update(
                {
                    name: name,
                    price: price,
                    condition: condition,
                    description: description,
                    image: uploadedImages.length > 0 ? uploadedImages[0].filename : [] },
                {
                    where: {
                        id: {
                            [Op.eq]: id,
                        },
                    },
                }
            );

            res.status(200).send({ status: true, message: "Successfully updated the Product", images: uploadedImages });
        } else {
            await Product.update(
                {
                    name: name,
                    price: price,
                    condition: condition,
                    description: description,
                    image: uploadedImages.length > 0 ? uploadedImages[0].filename : [],                },
                {
                    where: {
                        id: {
                            [Op.eq]: id,
                        },
                    },
                }
            );

            res.status(200).send({ status: true, message: "Successfully updated the Product" });
        }
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
        res.status(500).send({ status: false, message: "Internal Server Error" });
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

        const images = await Image.findAll({
            where: {
                productId: id,
            }
        });

        for (const image of images) {
            const filePath = path.join(__dirname, `../db/img/${category}/${image.filename}`);
            await fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("File deleted successfully");
                }
            });
        }

        await Image.destroy({
            where: {
                productId: id,
            }
        });

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
            image: `${process.env.BACKEND_ADDRESS}/img/${category}/${product.image}`,
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
            image: `${process.env.BACKEND_ADDRESS}/img/${existingProduct.category}/${existingProduct.image}`,
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

exports.uploadImageByProductId = async (req, res) => {
    try {
        const { productId } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(500).send({ status: false, message: "No files found" });
        }

        const uploadPromises = files.map(async (file) => {
            const newImage = await Image.create({
                productId: productId,
                filename: file.filename,
            });
            return newImage;
        });

        const uploadedImages = await Promise.all(uploadPromises);

        res.status(200).send({ status: true, message: "Images uploaded successfully", images: uploadedImages });
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

        const images = await Image.findAll({
            where: {
                productId: {
                    [Op.eq]: id,
                }
            }
        });

        res.status(200).send({ status: true, message: "Images retrieved successfully", images });
    } catch (err) {
        console.error("Internal Server Error: ", err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};