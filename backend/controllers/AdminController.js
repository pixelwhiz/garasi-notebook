const db = require("../models/Index");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL_LOGIN && password === process.env.ADMIN_PASSWORD_LOGIN) {
            const ip = req.connection.remoteAddress;
            const token = jwt.sign({ ip }, process.env.JWT_SECRET_KEY);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({ status: true, message: "Login Berhasil!", token: true });
            console.log(`${ip} is Connnected`);
        } else {
            res.status(401).send({ status: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log("Internal Server Error: ", error.message);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('connect.sid');
    res.clearCookie('jwt');
    res.status(200).send({ status: true, message: "Logout Successfully" });
};

exports.check = async (req, res) => {
    try {
        const jwt = req.cookies.jwt;
        if (jwt) {
            res.status(200).send({ status: true });
        } else {
            res.status(500).send({ status: false });
        }
    } catch (err) {
        console.log("Internal Server Error: ", err.message);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};