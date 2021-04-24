module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define("Sale", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        percentage: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        productID: {
            type: Sequelize.UUID,
            allowNull: false
                // references: {
                //     model: "productID",
                //     key: "productID"
                // }
        },
    }, { timestamps: true });

    return Sale;
};