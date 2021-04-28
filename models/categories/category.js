module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        uuid:{
            type: Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          name:{
            type:Sequelize.STRING,
            allowNull:false
          },
          departmentId: {
            type: Sequelize.UUID,
            allowNull: false
          }
        
    });
  
    return Category;
  };