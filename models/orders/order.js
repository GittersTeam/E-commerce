module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
 
    id: {
      type: Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4,
      primaryKey:true
      },
      OrderDate: {
        type: Sequelize.DATE,
      },
      customerID:{ 
       type: Sequelize.UUID,
      },
      paymentStatus: {
        type:Sequelize.STRING,
        enum: ["pending", "delivered", "cancelled"],
      },
      products: { 
        type: Sequelize.JSON,
  
      },
      packages:{
        type: Sequelize.JSON,

      }
    })
  

      return Order;
  }
