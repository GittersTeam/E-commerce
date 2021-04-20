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

module.exports = db;