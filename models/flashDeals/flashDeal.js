module.exports = (sequelize, Sequelize) => {
    const FlashDeal = sequelize.define("FlashDeal", {
        flashDealID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        desc: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
    }, { timestamps: true });

    return FlashDeal;
};