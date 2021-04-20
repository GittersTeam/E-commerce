var express = require('express');
const db = require("../../models");
const User = db.users;
const Op = db.Sequelize.Op;
const {
  hashSync,
  genSaltSync
} = require('bcrypt');


const getAllUser = (req,res) =>{
  User.findAll() // convert to sql query 
      .then(data => {
        res.send({
          'data':data,
          'message':'User retrieve successfully'
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
     
  }


const getUserByID = (req, res) =>{

    User.findByPk(req.params.id)
      .then(data => {
        res.send({
          data:data,
          msg:"This is the findByPK"
          });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
  }


const updateUser = (req, res) =>{

    const id = req.params.id;
    User.update(req.body, {
      where: { userID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  }
  const updateUserPassword = (req, res) =>{
    var password= req.body.password;
    var password2 = req.body.password2;

    if(password != password2){
        console.log('Passwords do not match');
        return res.send({message:'Passwords do not match'});
    }

    //Check password length
    if(password.length < 6){
        return res.send({message:'Password should be at least 6 characters'});
        
    }
    var salt = genSaltSync(10)
    password = hashSync(req.body.password,salt)

    const id = req.params.id;
    User.update({password:password}, {
      where: { userID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  }
  const deleteUserByID = (req, res) =>{

    const id = req.params.id;
    User.destroy({
      where: { userID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot user address with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error user address with id=" + id
        });
      });
  }
  module.exports = {
    updateUser,getUserByID,deleteUserByID,updateUserPassword,getAllUser
   }
