const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const ImageModel = sequelize.define("image", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
        productId: { type: Sequelize.UUID, allowNull: false },
        filename: { type: Sequelize.STRING, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    }, {
        tableName: "image"
    });

    return ImageModel;
};