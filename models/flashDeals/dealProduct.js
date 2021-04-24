module.exports = (sequelize, Sequelize) => {
    const dealProduct = sequelize.define("dealProduct", {
        dealID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "flashDeals",
                key: "id"
            }
        },
        productID: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            // references: {
            //     model: "products",
            //     key: "productID"
            // }
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
    }, { timestamps: true });

    return dealProduct;
};