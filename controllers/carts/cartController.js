var express = require('express');
const db = require("../../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;

const getallProduct=function(req, res){
 
  Cart.findOne({where:{ customerID:req.customer.customerID} })
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  }

 
    const AddProduct=function(req, res){

        const cart= {
          customerID:req.body.customerID
        };
        Cart.create(cart)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the room."
          });
        });}
       
       const updateCart=function(req, res){
    
    Cart.update(req.body, {
        where: { customerID:req.customer.customerID }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "cart was updated successfully."
            });
          } else {
            res.send({
              message: 'Cannot cart a room with id=${id}'
            });
          }
        })
      
        .catch(err => {
          res.status(500).send({
            message: "Error updating Student with id=" + id
          });
        });
           
  
           
        }
         module.exports = {getallProduct,updateCart,AddProduct}
