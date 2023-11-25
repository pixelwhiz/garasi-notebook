const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const bodyParser = require("body-parser");
// const router = require("./router");

app.use(express.static('db'));

const corsOptions = {
    credentials: true,
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
};

// app.use(router);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});