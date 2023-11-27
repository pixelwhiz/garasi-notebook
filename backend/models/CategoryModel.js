const { Sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const CategoryModel = sequelize.define("category", {
        id: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
        name: { type: Sequelize.STRING, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    }, {
        tableName: "category"
    });

    return CategoryModel;
};