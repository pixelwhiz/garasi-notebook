const db = require("../models");
const {randomUUID, randomInt} = require("crypto");
const {Sequelize, DataTypes, UUIDV4} = require("sequelize");
const Product = db.product;
const {Op} = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
    try {
        const { id, name, description, price, category } = req.body;

        const existingProduct = await Product.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        if (existingProduct) {
            return res.status(401).send({ status: false, message: "Product with that name is Already Exists!" });
        }

        const data = await Product.create({
            id: id,
            name: name,
            price: price,
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
        const { name, description, category } = req.body;

    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Erorr" });
        console.log("Internal Server Error: ", err.message);
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