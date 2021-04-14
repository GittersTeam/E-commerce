module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        brandID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        logo: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    });


    return Brand;

};