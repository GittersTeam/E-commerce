module.exports = (sequelize, Sequelize) => {
    const Advertisement = sequelize.define("Advertisement", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        desc: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        keywords: {
            type: Sequelize.JSON,
            allowNull: true
        },
        photos: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        link: {
            type: Sequelize.STRING(1024),
            allowNull: false
        }
    }, { timestamps: true });

    return Advertisement;
};