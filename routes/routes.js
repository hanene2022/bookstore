 const express = require('express');
 const route= express.Router();
 const controller=require("../controller/Controller")
 route.get('/users/:id',(req, res) => {
  controller.getuser(req,res) 
 
 })

//   route.post('/book/addbook',(req,res)=>{
//     controller.addbook(req,res)
//     })
//   route.post('/register/',(req, res) => {
//      controller.register(req,res) 
    
//   })

 module.exports= route