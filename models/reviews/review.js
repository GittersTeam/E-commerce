module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("Review", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        customerID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "customers",
                key: "customerID"
            }
        },
        productID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "products",
                key: "productID"
            }
        },
        review: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        rating: {
            type: Sequelize.NUMERIC(1),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, { timestamps: true });

    return Review;
};