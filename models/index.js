require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
<<<<<<< HEAD
  host: process.env.DB_HOST,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
=======
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
>>>>>>> 38da3185af61e41489924d9606d1199b869264e0
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

<<<<<<< HEAD
db.cart = require("./carts/cart.js")(sequelize, Sequelize); //add this line
//db.cart.hasMany({ProductID});
db.order = require("./orders/order.js")(sequelize, Sequelize); //add this line

module.exports = db;

=======
module.exports = db;
>>>>>>> 38da3185af61e41489924d9606d1199b869264e0
