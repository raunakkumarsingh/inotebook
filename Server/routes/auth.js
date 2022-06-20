 const express =require('express');
const User = require('../models/user');
 const router=express.Router();



 //create a User using: POST "/api/auth/" Doesnot required auth
 router.post('/',(req ,res)=>{
    // obj={
    //     a:'thios',
    //     number:34
    // }
    // res.json(obj)

    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);
 })

 module.exports =router
  