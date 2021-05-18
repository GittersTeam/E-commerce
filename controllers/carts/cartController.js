var express = require('express');
const db = require("../../models");
const Cart = db.carts;
const Op = db.Sequelize.Op;

const getCartByID=function(req, res){
 
  Cart.findOne({where:{ cartID:req.userData.cartID} })
  
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

 
   const updateCartByID=function(req, res){
    
    Cart.update(req.body, {
      where:{cartID:req.userData.cartID}
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "cart was updated successfully."
            });
          } else {
            res.send({
              message: 'Cannot update a cart with id=${id}'
            });
          }
        })
      
        .catch(err => {
          res.status(500).send({
            message: "Error updating cart with id=" + id
          });
        });  
        }
         module.exports = {getCartByID,updateCartByID}
