var express = require('express');
const { orders, customers } = require('../../models');
const db = require("../../models");
const Order = db.order;
const Cart = db.cart;
const Customer=db.customers;

const Op = db.Sequelize.Op;
const CreateOrder=function(req, res){
       
       const order= {
              OrderDate:new Date(),
              customerID: req.body.customerID,
              paymentStatus:req.body.paymentStatus,
              products:req.body.products,
              packages:req.body.packages
       
       };
     
       Order.create(order)
       .then(data => {
         res.send({data:data, message:"the order has been created successfully"});
         
       })
       .catch(err => {
         res.status(500).send({
           message:
             err.message || "Some error occurred while creating a booking."
         });
       });
     }
      
  
const getOrders=function(req, res){

  Order.findAll({ include:{model:Customer,as:'customers'}})
  
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

   const GetorderByID= function(req, res){
 

      Order.findByPk( { where: {customerID:req.customer.customerID} ,
          include:{model:customers,as:'customers'}})
      
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

       
        const updateOrder=function(req, res){
     ;
     Order.update(req.body, {
        where:  { customerID:req.customer.customerID }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Order was updated successfully."
            });
          } else {
            res.send({
              message: 'Cannot update an order with id=${id}'
            });
          }
        })
      
        .catch(err => {
          res.status(500).send({
            message: "Error updating order with id=" + customerID
          });
        });
           
        }
       const DeleteOrder = function(req, res){

       
          Order.destroy({
         where: { customerID:req.customer.customerID }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "order was deleted successfully."
                });
              } else {
                res.send({
                  message: 'Cannot delete order with id=${id}.'
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error deleting an order with id=" + customerID
              });
            });
           
        }
          module.exports ={CreateOrder,getOrders,GetorderByID,updateOrder,DeleteOrder}
       
