
exports.create = async (req, res) => {
    try {
        const { name, description, category } = req.body;
    } catch (err) {
        res.status(500).send({ status: false, message: "Internal Server Error" });
        console.log("Internal Server Error: ", err.message);
    }
};