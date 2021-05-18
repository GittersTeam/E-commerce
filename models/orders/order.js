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
        type:Sequelize.ENUM('pending', 'delivered', 'cancelled'),
      
      },
     OrderStatus: {
        type:Sequelize.ENUM('pending','shipped','refunded', 'cancelled'),
      },
      products: { 
        type: Sequelize.JSON,

      },
      packages:{
        type: Sequelize.JSON,

      },
      customerID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: "customers",
          key: "customerID"
        }
      },
    })
  

      return Order;
  }
