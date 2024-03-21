const errorResponse = require("../utils/errorResponse")
const Cart =require("../models/Cart");

const { query } = require("express");


exports.getCartItems = async (req,res,next)=>{

    try{

        let results = {}
        let query = Cart.findMany({username:req.params.username});
        
        const cart = await query;

        return res.status(200).json({"status":true,"data":cart}) 
        
    }catch(err){
        next(err)
    }
   
}

exports.addItems = async (req,res,next)=>{

    try{

        let orderDetails = req.body

        orderDetails.username = req.params.username

        let query = Cart.findMany(orderDetails);


        return res.status(200).json({"status":true,"data":null}) 
        
    }catch(err){
        next(err)
    }
   
}
