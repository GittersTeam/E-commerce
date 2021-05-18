
module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    cartID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    products: {
      type: Sequelize.JSON,

    },
    packages: {
      type: Sequelize.JSON,

    }

  })
  return Cart;
}
