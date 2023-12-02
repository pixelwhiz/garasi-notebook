module.exports = {
    HOST: "localhost",
    USER: "garasinotebook",
    PASSWORD: "#GarasiNotebook123",
    DB: "garasinotebook",
    DIALECT: "mysql",
    PORT: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};