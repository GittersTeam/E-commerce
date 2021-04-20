module.exports = (sequelize, Sequelize) => {
    const Subcategory = sequelize.define("subcategory", {
        uuid:{
            type: Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: 'name can not be null' },
              notEmpty: { msg: 'name can not be empty' },
      
            },
          },
          icon: {
            type: Sequelize.STRING,
            allowNull: false
          },
      
          categoryId: {
            type: Sequelize.UUID,
            allowNull: false
          }
        
    });
  
    return Subcategory;
  };