 const express =require('express');
const User = require('../models/user');
 const router=express.Router();
 const { body, validationResult } = require('express-validator');



 //create a User using: POST "/api/auth/" Doesnot required auth
  router.post('/createuser',[
     body('name','Enter a valid name').isLength({min:3}),
     body('email','Enter a valid Email').isEmail(),
     body('password','password must be atleast 5 characters').isLength({min:5}),
 ], async (req ,res)=>{                                 //async make function a synchronus
    // obj={
    //     a:'thios',
    //     number:34
    // }
    // res.json(obj)

    //if there are errors,return Bad requesrt and the errors
    const errors = validationResult(req);
    

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      try{
    //check whether the user with this email exist already
    let user = await User.findOne({email:req.body.email});
    console.log(user);
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already"})
    }
    //create a new user 
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      })

    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //   res.json({error: 'please enter a unique value',message:err.message})})


    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
    // res.send(req.body);
    res.json(user);
      }
      //catch error
      catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");

      }
    // res.send("hello");
 })

 module.exports =router
  