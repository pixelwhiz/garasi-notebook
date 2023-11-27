const { Sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const ImageModel = sequelize.define("image", {
        url: { type: Sequelize.STRING, allowNull: false },
        product_id: { type: Sequelize.UUID, allowNull: false, references: { model: "product", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE" },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    }, {
        tableName: "image"
    });

    return ImageModel;
};