const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const router = require("./router/Index");

app.use(express.static('db'));
app.use("./db", express.static('db'));

app.use(session({
    secret: `${process.env.SECRET_KEY_SESSION}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000000,
    },
}));

const dotenv = require("dotenv");
dotenv.config();

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: process.env.SERVER_ADDRESS,
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});