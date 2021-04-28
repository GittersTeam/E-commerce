var express = require('express');
const db = require("../../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;
  
const getallProduct=function(req, res){

  Cart.findAll()
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

  const FindProductByID= function(req, res){
 

      Cart.findByPk(req.params.id)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred ."
          });
        });
       
    }
    const CreateCart=function(req, res){

        const cart= {
          products: req.body.products,
          packages:req.body.packages,
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

        
      const id = req.params.id;
 
    Cart.update(req.body, {
        where: { id: id }
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
       const deleteProduct = function(req, res){
      
          const id = req.params.id;
        
          Cart.destroy({
            where: { id : id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Product was deleted successfully."
                });
              } else {
                res.send({
                  message: 'Cannot delete Product with id=${id}.'
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error deleting a Product with id=" + id
              });
            });
           
        }
         module.exports = {CreateCart,getallProduct,deleteProduct,updateCart,FindProductByID}
