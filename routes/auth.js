const express=require("express");
const authrouter=express.Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignupdate }=require("../utils/validation");
// authrouter.post("/signup",async(req,res)=>{
//     try{
//     validateSignupdate(req);
//     const{name,email,password}=req.body;
//     // const existing=await User.findOne({email});
//     // if(existing){
//     //     return res.status(400).json({message:"User Already Exist"});

//     // }
//     const passwordHash=await bcrypt.hash(password,10);
//     console.log(passwordHash);
//     //const user=new User({name:req.name,email:req.name,password:passwordHash});
//     const newUser=new User({name,email,password:passwordHash});
//     await newUser.save();
//     res.status(201).json({message:"Successfully signed up",user:newUser})
// }catch(err){
// res.status(400).send("ERROR:"+err.message);
// }
// });
authrouter.post("/signup",async(req,res)=>{
    console.log("👉 POST /signup hit"); 
    try{
    validateSignupdate(req);
    console.log("BODY RECEIVED:",req.body); 
    
    const{name,password,email}=req.body;
    
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);
    //const user=new User({name:req.name,email:req.name,password:passwordHash});
    const newUser=new User({name,email,password:passwordHash});
    await newUser.save();
    res.status(201).json({message:"Successfully signed up",data:newUser})
  }catch(err){
  res.status(400).send("ERROR:"+err.message);
  }
  });
  authrouter.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        console.log("this is working");
        const user=await User.findOne({email});
        if(!user){
            throw new Error("Email is not in the database");
        }
        const ispasswordvalid=await user.Validatepass(password);
        if(ispasswordvalid){
            const token=await user.getJWT();
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
            res.status(200).json({
                message: "Login successful",
                user,
                token,
              });

        }else{
            throw new Error("password is not valid");
        }

    }catch(err){
        res.status(400).send("ERROR:"+err.message);
    
    }

  });
  authrouter.post("/logout",(req,res)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
        });
        res.send("logout succesfully");


    }catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
  })
module.exports=authrouter;

