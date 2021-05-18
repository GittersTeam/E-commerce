module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    customerID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,

    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthDay: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userID: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users', //table name 
        key: 'userID'
      }
    },
    cartID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: 'carts', //table name 
        key: 'cartID'
      }
    }

  }, {
    tableName: "customers",
    timestamps: true,
  });

  return Customer;
};