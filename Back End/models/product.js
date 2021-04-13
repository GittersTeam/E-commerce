module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(30),
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        barCodeNumber: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            unique: 'barCodeNumber',
        },
        brandID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: 'brandID',
            allowNull: false

        },
    }, {
    });


    return Product;

};