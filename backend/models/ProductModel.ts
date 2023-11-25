import { Sequelize, DataTypes, Model } from 'sequelize';

interface ProductAttributes {
    id: number;
    name: string;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
}

export const initProductModel = (sequelize: Sequelize) => {
    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // ...
        },
        {
            sequelize,
            modelName: 'product',
            tableName: 'product',
            timestamps: true,
            // ...
        }
    );
    return Product;
};
