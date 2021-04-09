module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        productID: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,

        },
        productName: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        // productPhoto: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,

        // },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        productSize: {
            type: Sequelize.INTEGER,
            allowNull: false

        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false

        },
        brandID: {
            type: Sequelize.INTEGER,
            unique: 'brandID',
            allowNull: false

        },
    }, {
        timestamps: false,
    });


    return Product;

};