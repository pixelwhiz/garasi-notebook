const db = require("../models/Index");
const Dashboard = db.dashboard;
const Product = db.product;
const Category = db.category;

exports.addVisitor = async (req, res) => {
    try {
        const { data } = req.body;
        const totalVisitor = parseInt(data.totalVisitor, 1);
        await Dashboard.create({
            totalVisitor: totalVisitor,
        });

        res.status(200);
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
        res.status(500).send("Internal Server Error");
    }
};

exports.addOrder = async (req, res) => {
    try {
        const { data } = req.body;
        const totalOrder = parseInt(data.totalOrder, 1);
        await Dashboard.create({
            totalOrder: totalOrder,
        });

        res.status(200);
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { data } = req.body;
        const totalProduct = parseInt(data.totalProduct, 1);
        await Dashboard.create({
            totalProduct: totalProduct,
        });

        res.status(200);
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
    }
};

exports.getAllData = async (req, res) => {
    try {
        const allProduct = await Category.findAndCountAll();
        const allVisitor = await Dashboard.sum("totalVisitor");
        const allOrder = await Dashboard.sum("totalOrder");
        res.status(200).send({ totalProduct: allProduct, totalVisitor: allVisitor, totalOrder: 1 });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log("Error: ", err.message);
    }
};