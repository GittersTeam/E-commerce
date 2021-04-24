module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresse", {
      addressID: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true,
      },
      addressLine1: {
        type: Sequelize.STRING,
        allowNull:false
      },
      addressLine2: {
        type: Sequelize.STRING,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull:false
      },
      customerID: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'customers', //table name 
          key: 'customerID'
        }
      }
    },{
      tableName:"addresses",
      timestamps:false,
    });
  
    return Address;
  };
