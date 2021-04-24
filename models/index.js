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

//add this line
db.users = require("./users/user")(sequelize, Sequelize);
db.addresses = require("./addresses/address")(sequelize, Sequelize);
db.customers = require("./customers/customer")(sequelize, Sequelize);

db.addresses.belongsTo(db.customers, { foreignKey: 'customerID' });
db.customers.hasMany(db.addresses, { foreignKey: 'customerID' });

db.customers.belongsTo(db.users, { foreignKey: 'userID' });
db.users.hasOne(db.customers, { foreignKey: 'userID' });


module.exports = db

