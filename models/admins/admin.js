// module.exports =  (sequelize, Sequelize) => {
//     const Admin = sequelize.define("admin", {
//       adminID: {
//         type: Sequelize.UUID,
//         defaultValue:Sequelize.UUIDV4,
//         primaryKey:true,

//       },
//       firstName: {
//         type: Sequelize.STRING,
//         allowNull:false
//       },
//       lastName: {
//         type: Sequelize.STRING,
//         allowNull:false
//       },
//       phoneNumber: {
//         type: Sequelize.STRING,
//         allowNull:false
//       },
//       privilege:{
//         type: Sequelize.BOOLEAN,
//         allowNull:false
//       },
//     },{
//       tableName:"admins",
//       timestamps:true,
//     });
//     return Admin;
//   };
