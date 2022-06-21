 const express =require('express');
const User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
 const router=express.Router();
 const { body, validationResult } = require('express-validator');
var fetchuser =require('../middleware/fetchuser');
const JWT_SECRET ='#Raunakiscrazy';

//Routes 1

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
    const user = await User.findOne({email:req.body.email});
    console.log(user);
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already"})
    }
    const salt = await bcrypt.genSaltSync(10);
    const  secPass = await bcrypt.hash(req.body.password,salt);

    //create a new user 
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })  

    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //   res.json({error: 'please enter a unique value',message:err.message})})


    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
    // res.send(req.body);
    const data={
        user:{
            id:user.id
        }
    }
    var authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);

    res.json({authtoken});
      }
      //catch error
      catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");

      }
    // res.send("hello");
 })

 //Rouutes 2

 //Authenticate a User using : POST "/api/auth/login". no login required
 router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req,res)=>{
    //if there are errors return Bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email ,password}=req.body;
    try{
      let  user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        //check password or hashed password mached or not
        const passwordCompare= await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "please try to login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        var authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        res.json({authtoken});
             
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})




//Routes 3

router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId= req.user.id;
        const user =await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }


})

 module.exports =router
  