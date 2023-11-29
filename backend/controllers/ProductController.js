const db = require("../models");
const {randomUUID, randomInt} = require("crypto");
const {Sequelize, DataTypes, UUIDV4} = require("sequelize");
const Product = db.product;
const {Op} = require("sequelize");
const { v4: uuidv4 } = require("uuid");


exports.create = async (req, res) => {
    try {
        const { name, description, category } = req.body;
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

exports.getAllData = async (req, res) => {
    try {
        const allProduct = await Product.findAll();
        const productData = allProduct.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
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