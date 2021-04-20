// var express = require('express');
// const db = require("../../models");
// const Admin = db.admin;
// const Op = db.Sequelize.Op;
// const {
//   hashSync,
//   genSaltSync
// } = require('bcrypt');

// const getAdminByID = (req, res) =>{

//     Admin.findByPk(req.params.id)
//       .then(data => {
//         res.send({
//           data:data,
//           msg:"This is the findByPK"
//           });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving Admin."
//         });
//       });
//   }

// const updateAdmin = (req, res) =>{
//     const id = req.params.id;
//     Admin.update(req.body, {
//       where: { adminID: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Admin was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Admin with id=" + id
//         });
//       });
//   }

//   const deleteAdminByID = (req, res) =>{

//     const id = req.params.id;
//     Admin.destroy({
//       where: { adminID: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Admin was deleted successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot Admin address with id=${id}. Maybe Admin was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error Admin address with id=" + id
//         });
//       });
//   }

//   const updateAdminPassword = (req, res) =>{
//     var password= req.body.password;
//     var password2 = req.body.password2;

//     if(password != password2){
//         console.log('Passwords do not match');
//         return  res.send({message:'Passwords do not match'});
//     }

//     //Check password length
//     if(password.length < 6){
//       return  res.send({message:'Password should be at least 6 characters'});
        
//     }
//     var salt = genSaltSync(10)
//     password = hashSync(req.body.password,salt)

//     const id = req.params.id;
//     Admin.update({password:password}, {
//       where: {adminID: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Admin was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating User with id=" + id
//         });
//       });
//   }
//   module.exports = {
//     updateAdmin,getAdminByID,deleteAdminByID,updateAdminPassword
//    }
