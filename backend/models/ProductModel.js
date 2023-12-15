const { Sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const ProductModel = sequelize.define("product", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
        name: { type: Sequelize.STRING, allowNull: false },
        price: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: false },
        condition: { type: Sequelize.STRING, allowNull: false },
        category: { type: Sequelize.STRING, allowNull: false },
        image: { type: Sequelize.STRING, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    }, {
        tableName: "product"
    });

    // ProductModel.hasMany(sequelize.models.image, { as: 'images', foreignKey: 'productId' });

    return ProductModel;
};