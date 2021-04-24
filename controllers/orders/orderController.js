var express = require('express');
const db = require("../../models");
const Order = db.order;
const Cart = db.cart;

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

  Order.findAll()
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
 

      Order.findByPk(req.params.id)
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
//     const CreateRoom=function(req, res){

//         const room= {
//           room_ID: req.body.room_ID,
//           room_type: req.body.room_type,
//           room_floor: req.body.room_floor,
//           room_Number:req.body.room_Number,
//           Avaliable:true
          
//         };
//         Rooms.create(room)
//         .then(data => {
//           res.send(data);
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while creating the room."
//           });
//         });}
       
        const updateOrder=function(req, res){
      const id = req.params.id;
     Order.update(req.body, {
        where: { id: id }
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
            message: "Error updating order with id=" + id
          });
        });
           
        }
       const DeleteOrder = function(req, res){

          const id = req.params.id;
        
          Order.destroy({
            where: { id: id }
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
                message: "Error deleting an order with id=" + id
              });
            });
           
        }
          module.exports ={CreateOrder,getOrders,GetorderByID,updateOrder,DeleteOrder}
       
