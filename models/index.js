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
db.departments = require("./departments/department.js")(sequelize, Sequelize); //add this line
db.categories = require("./categories/category.js")(sequelize, Sequelize); //add this line
db.subcategories = require("./departments/subcategory.js")(sequelize, Sequelize); //add this line
db.departments.hasMany(db.categories, {foreignKey:'departmentId', as:'categories'})
db.categories.belongsTo(db.departments, {foreignKey:'departmentId', as:'department'})
db.categories.hasMany(db.subcategories , {foreignKey:'categoryId', as:'subcategories'})
db.subcategories.belongsTo(db.categories, { foreignKey: 'categoryId', as: 'category' })
db.cart = require("./carts/cart.js")(sequelize, Sequelize); //add this line
//db.cart.hasMany({ProductID});
db.order = require("./orders/order.js")(sequelize, Sequelize); //add this line

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
