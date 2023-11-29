const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const DashboardModel = sequelize.define("dashboard", {
        id: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
        totalVisitor: { type: DataTypes.INTEGER, allowNull: false },
        totalOrder: { type: DataTypes.INTEGER, allowNull: false },
        totalProduct: { type: DataTypes.INTEGER, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    }, {
        tableName: "dashboard",
        hooks: {
            beforeCreate(dashboard, options) {
                if (new Date().getDate() === 1) {
                    dashboard.totalVisitor = 0;
                    dashboard.totalOrder = 0;
                    dashboard.totalProduct = 0;
                }

                dashboard.totalVisitor = 0;
                dashboard.totalOrder = 0;
                dashboard.totalProduct = 0;
            }
        },
    });

    return DashboardModel;
};
