const db = require("../models");
const {randomUUID, randomInt} = require("crypto");
const {Sequelize, DataTypes, UUIDV4} = require("sequelize");
const Product = db.product;
const Category = db.category;
const {Op} = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
    try {
        const { id, name, description, price, condition, imageUrls, category } = req.body;

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

        let categoryInstance = await Category.findOrCreate({
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
            imageUrls: imageUrls,
        });

        res.status(200).send({ status: true, message: "New product was Successfully added!" });
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};

exports.edit = async (req, res) => {
    try {
        const { name, description, category } = req.body;

    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Erorr" });
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