
module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
       },
      customerID: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,

       allowNull:false
      },
      products: { 
        type: Sequelize.JSON,
     

      },
      packages:{
        type: Sequelize.JSON,

      }

    })
      return Cart;
    }
 