module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
        uuid:{
            type: Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
              notNull:{msg:'name can not be null'},
              notEmpty:{msg:'name can not be empty'},
             
            }
          },
          icon:{
            type:Sequelize.STRING,
          },
          descrption: {
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
              notNull:{msg:'descrption can not be null'},
              notEmpty:{msg:'descrption can not be empty'}
            }
          }
        
    });
  
    return Department;
  };
