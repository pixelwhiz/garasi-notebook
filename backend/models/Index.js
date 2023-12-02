const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("garasinotebook", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: dbConfig.PORT,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.sync();

db.product = require("./ProductModel")(sequelize, Sequelize);
db.category = require("./CategoryModel")(sequelize, Sequelize);
db.dashboard = require("./DashboardModel")(sequelize, Sequelize);
db.image = require("./ImageModel")(sequelize, Sequelize);

module.exports = db;