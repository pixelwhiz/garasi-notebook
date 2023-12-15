const db = require("../models/Index");
const {randomUUID, randomInt} = require("crypto");
const {Sequelize, DataTypes, UUIDV4, sequelize} = require("sequelize");
const Category = db.category;
const Product = db.product;
const Image = db.image;
const {Op} = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs').promises;
const fsPromises = require('fs').promises;
const path = require('path');

exports.create = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (name.length < 6 || name.length > 12) return res.status(401).send({ status: false, message: "The category name must be 6 - 12 Characters" });
        if (!name) return res.status(401).send({ status: false, message: "The name is empty!" });

        const existingCategory = await Category.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        if (existingCategory) {
            return res.status(401).send({ status: false, message: "Category is already exists!" });
        }

        const existingCategoryName = await Category.findOne({
            where: {
                name: {
                    [Op.eq]: name,
                },
                name: name
            },
        });

        const categoryFolderPath = path.join(__dirname, `../db/img/${name}`);

        try {
            await fsPromises.mkdir(categoryFolderPath, { recursive: true });
            console.log("Category folder created successfully");
        } catch (err) {
            console.error("Error creating category folder:", err);
            return res.status(500).send({ status: false, message: "Internal Server Error" });
        }

        if (existingCategoryName) {
            return res.status(401).send({ status: false, message: "Category with that name is Already exists!" });
        }

        const data = await Category.create({
            id: id,
            name: name,
            total: 0,
        });

        res.status(200).send({ status: true, message: `Creating a new Category with the name ${name}` });
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const existingCategory = await Category.findOne({
            where: {
                id: id,
            },
        });

        if (!existingCategory) {
            return res.status(404).send({ status: false, message: "Category not found!" });
        }

        const productsInCategory = await Product.findAll({
            where: {
                category: existingCategory.name,
            },
        });

        const categoryFolderPath = path.join(__dirname, `../db/img/${existingCategory.name}`);

        try {
            await fsPromises.rmdir(categoryFolderPath, { recursive: true });
            console.log("Category folder deleted successfully");
        } catch (err) {
            console.error("Error deleting category folder:", err);
        }

        for (const product of productsInCategory) {
            const images = await Image.findAll({
                where: {
                    productId: product.id,
                },
            });

            for (const image of images) {
                const filePath = path.join(__dirname, `../db/img/${existingCategory.name}/${image.filename}`);

                try {
                    await fsPromises.access(filePath, fsPromises.constants.F_OK);
                    await fsPromises.unlink(filePath);
                    console.log("File deleted successfully");
                } catch (err) {
                    console.error("Error deleting file:", err);
                }
            }

            await Image.destroy({
                where: {
                    productId: product.id,
                }
            });
        }

        await Product.destroy({
            where: {
                category: existingCategory.name,
            },
        });

        await Category.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).send({ status: true, message: `Successfully deleted Category and associated Products` });
    } catch (err) {
        console.error("Internal Server Error: ", err.message);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};

exports.getAllData = async (req, res) => {
    try {
        const allCategory = await Category.findAll();
        const categoryData = allCategory.map(category => ({
            id: category.id,
            name: category.name,
            total: category.total,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }));
        res.json(categoryData);
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};

exports.getTotalItemByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const itemCount = await Product.count({
            where: { category: category },
        });

        res.json({ itemCount: itemCount });
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getNameById = async (req, res) => {
    try {
        const { id } = req.body;

        const existingCategory = await Category.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        return res.status(200).send({ status: true, name: existingCategory.name });

    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};