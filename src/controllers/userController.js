const errorResponse = require("../utils/errorResponse")

const User =require("../models/User");

const { query } = require("express");


exports.saveUser = async (req,res,next)=>{

    try{
        
       
        let eUser = await User.findOne({username: req.body.username})
       
        if(eUser){
            return res.status(422).json({"status":false,"data":null}) 
        }
        const user = await User.create(req.body);
        return res.status(200).json({"status":true,"data":null}) 
        
    }catch(err){
        console.log(err)
        next(err)
    }
   
}

exports.verifyUser = async (req,res,next)=>{

    try{
        
        let eUser = await User.findOne({username: req.body.username})
        
        if(!eUser){
            return res.status(422).json({"status":false,"data":null}) 

        }
        
        if(eUser.password !== req.body.password){
            return res.status(422).json({"status":false,"data":null}) 
        }
       
        return res.status(200).json({"status":true,"data":null}) 
        
    }catch(err){
        console.log(err)
        next(err)
    }
   
}