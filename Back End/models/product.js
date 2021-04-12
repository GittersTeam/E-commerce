module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        productID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        // productPhoto: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,

        // },
        price: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: false,

        },
        currency: {
            type: Sequelize.CHAR(3),
            allowNull: false,
        },

        size: {
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