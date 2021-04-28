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

//Importing Schemas
db.carts = require("./carts/cart.js")(sequelize, Sequelize); //add this line
db.orders = require("./orders/order.js")(sequelize, Sequelize); //add this line
db.advertisements = require("./advertisements/advertisement")(sequelize, Sequelize);
db.sales = require("./sales/sale")(sequelize, Sequelize);
db.flashDeals = require("./flashDeals/flashDeal")(sequelize, Sequelize);
db.reviews = require("./reviews/review")(sequelize, Sequelize);
db.users = require("./users/user")(sequelize, Sequelize);
db.addresses = require("./addresses/address")(sequelize, Sequelize);
db.customers = require("./customers/customer")(sequelize, Sequelize);
db.products = require("./products/product.js")(sequelize, Sequelize);
db.brands = require("./brands/brand.js")(sequelize, Sequelize);
db.packages = require("./packages/package.js")(sequelize, Sequelize);
db.departments = require("./departments/department.js")(sequelize, Sequelize); //add this line
db.categories = require("./categories/category.js")(sequelize, Sequelize); //add this line
db.subcategories = require("./subcategories/subcategory.js")(sequelize, Sequelize); //add this line
//----------------------------------------------------------------------------

db.products.belongsTo(db.brands, { foreignKey: 'brandID' });
db.brands.hasMany(db.products, { foreignKey: 'brandID' });

db.products.belongsToMany(db.packages, { through: 'packageProducts', foreignKey: 'productID' });
db.packages.belongsToMany(db.products, { through: 'packageProducts', foreignKey: 'packageID' });


db.departments.hasMany(db.categories, { foreignKey: 'departmentId', as: 'categories' })
db.categories.belongsTo(db.departments, { foreignKey: 'departmentId', as: 'department' })
db.categories.hasMany(db.subcategories, { foreignKey: 'categoryId', as: 'subcategories' })
db.subcategories.belongsTo(db.categories, { foreignKey: 'categoryId', as: 'category' })

db.addresses.belongsTo(db.customers, { foreignKey: 'customerID' });
db.customers.hasMany(db.addresses, { foreignKey: 'customerID' });
db.customers.belongsTo(db.users, { foreignKey: 'userID' });
db.users.hasOne(db.customers, { foreignKey: 'userID' });

db.subcategories.hasMany(db.products, { foreignKey: 'subcategoryId', as: 'products' })
db.products.belongsTo(db.subcategories, { foreignKey: 'subcategoryId', as: 'subcategory' })

db.products.hasMany(db.sales, { foreignKey: 'productID', as: 'sales' })
db.sales.belongsTo(db.products, { foreignKey: 'productID', as: 'products' })

db.products.hasMany(db.reviews, { foreignKey: 'productID', as: 'reviews' })
db.reviews.belongsTo(db.products, { foreignKey: 'productID', as: 'products' })

db.customers.hasMany(db.reviews, { foreignKey: 'customerID', as: 'reviews' })
db.reviews.belongsTo(db.customers, { foreignKey: 'customerID', as: 'customers' })

db.carts.belongsTo(db.customers, { foreignKey: 'customerID' });
db.customers.hasOne(db.carts, { foreignKey: 'cartID' });

db.customers.hasMany(db.orders, { foreignKey: 'customerID', as: 'orders' })
db.orders.belongsTo(db.customers, { foreignKey: 'customerID', as: 'customers' })

const dealProductPrice = sequelize.define('dealProductPrice', {
    price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
    }
}, { timestamps: true });
db.flashDeals.belongsToMany(db.products, { through: dealProductPrice, foreignKey: 'flashDealID' });
db.products.belongsToMany(db.flashDeals, { through: dealProductPrice, foreignKey: 'productID' });




module.exports = db;
