import { Sequelize } from "sequelize";
import { initProductModel } from "./ProductModel";

const dbConfig = require("../config/db.config.js");

const sequelizeOptions = {
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port: dbConfig.PORT,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
};

const sequelize = new Sequelize(sequelizeOptions);


interface Db {
    sequelize?: Sequelize;
    product?: any;
}

const db: Db = {};

db.sequelize = sequelize;
sequelize.sync();

db.product = initProductModel(sequelize);

module.exports = db;