const db = require("../models");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL_LOGIN && password === process.env.ADMIN_PASSWORD_LOGIN ) {
            res.status(200).send({ status: true, message: "Login Berhasil!" });
        } else {
            res.status(401).send({ status: true, message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};