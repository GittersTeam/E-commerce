module.exports = (sequelize, DataTypes) => {
    const Package = sequelize.define('Package', {
        packageID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false

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
        photo: {
            type: DataTypes.JSON,
            allowNull: true,

        },
    }, { tableName: "packages" }

    );


    return Package;

};