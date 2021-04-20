require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.products = require("./products/product.js")(sequelize, Sequelize);
db.brands = require("./brands/brand.js")(sequelize, Sequelize);
db.packages = require("./packages/package.js")(sequelize, Sequelize);
db.products.belongsTo(db.brands, { foreignKey: 'brandID' });
db.brands.hasMany(db.products, { foreignKey: 'brandID' });

db.products.belongsToMany(db.packages, { through: 'packageProducts', foreignKey: 'productID' });
db.packages.belongsToMany(db.products, { through: 'packageProducts', foreignKey: 'packageID' });

module.exports = db;