const db = require("../models");
const {randomUUID, randomInt} = require("crypto");
const {Sequelize, DataTypes, UUIDV4} = require("sequelize");
const Category = db.category;
const {Op} = require("sequelize");
const { v4: uuidv4 } = require("uuid");

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

        if (existingCategoryName) {
            return res.status(401).send({ status: false, message: "Category with that name is Already exists!" });
        }

        const data = await Category.create({
            id: id,
            name: name
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
                id: {
                    [Op.eq]: id,
                },
            },
        });
        if (!existingCategory) {
            return res.status(404).send({ status: false, message: "Category not found!" });
        }

        await Category.destroy({
           where: {
               id: {
                   [Op.eq]: id,
               },
           },
        });

        res.status(200).send({ status: true, message: `Successfully deleted Category` });
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};

exports.getAllData = async (req, res) => {
    try {
        const allCategory = await Category.findAll();
        const categoryData = allCategory.map(category => ({
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }));
        res.json(categoryData);
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};