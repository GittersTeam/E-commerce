module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        photo: {
            type: DataTypes.JSON,
            allowNull: true,

        },
        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,

        },
        cost: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,

        },
        currency: {
            type: DataTypes.CHAR(3),
            defaultValue: 'NIS',
            allowNull: false,
        },
        size: {
            type: DataTypes.JSON,
            allowNull: false
        },
        color: {
            type: DataTypes.JSON,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        barCodeNumber: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        brandID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'brands',
                key: 'brandID'
            }
        },
        subcategoryId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'subcategories',
                key: 'uuid'
            },

        },
    }, { tableName: "products" });


    return Product;

};