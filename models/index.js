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
db.departments = require("./departments/department.js")(sequelize, Sequelize); //add this line
db.categories = require("./categories/category.js")(sequelize, Sequelize); //add this line
db.subcategories = require("./departments/subcategory.js")(sequelize, Sequelize); //add this line

db.departments.hasMany(db.categories, {foreignKey:'departmentId', as:'categories'})
db.categories.belongsTo(db.departments, {foreignKey:'departmentId', as:'department'})

db.categories.hasMany(db.subcategories , {foreignKey:'categoryId', as:'subcategories'})
db.subcategories.belongsTo(db.categories, { foreignKey: 'categoryId', as: 'category' })

//Importing Schemas
db.advertisements = require("./advertisements/advertisement")(sequelize, Sequelize);
db.sales = require("./sales/sale")(sequelize, Sequelize);
db.flashDeals = require("./flashDeals/flashDeal")(sequelize, Sequelize);
db.dealProducts = require("./flashDeals/dealProduct")(sequelize, Sequelize);
db.reviews = require("./reviews/review")(sequelize, Sequelize);


//Relationships
// db.packages.hasMany(db.fixedPriceSales, { foreignKey: "saleID", as: "saleID" });
// db.packages.hasMany(db.percentageSales, { foreignKey: "saleID", as: "saleID" });
// db.percentageSales.belongsTo(db.packages, { foreignKey: "roomID" })
// db.fixedPriceSales.belongsTo(db.packages, { foreignKey: "roomID" })

module.exports = db;