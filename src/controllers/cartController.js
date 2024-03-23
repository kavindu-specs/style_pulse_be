const errorResponse = require("../utils/errorResponse")
const Cart =require("../models/Cart");
const Product =require("../models/Product");

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

    
        let existingProducts = await Cart.findOne({deviceId:req.body.deviceId}) 
    
        if(existingProducts){
           
            existingProducts.products.push(...req.body.products);
            await existingProducts.save();

            return res.status(200).json({"status":true,"data":null}) 
        }

        const items = await Cart.create(req.body);

        return res.status(201).json({"status":true,"msg":"item added","data":items})
        
    }catch(err){
        next(err)
    }
   
}

exports.removeItems = async (req,res,next)=>{

    try{

        let existingProducts = await Cart.findOne({ deviceId: req.body.deviceId });
        let product = await Product.findOne({ code: req.params.code });
    
        if (!existingProducts || !product) {
            return res.status(200).json({ "status": false, "msg": "No item found", data: null });
        }
    
        // Filter out the product with the matching productId
        existingProducts.products = existingProducts.products.filter(item => item.productId.toString() !== product._id.toString());
    
        await existingProducts.save();
    

        return res.status(201).json({"status":true,"msg":"deleted","data":null})
        
    }catch(err){
        next(err)
    }
   
}

exports.updateQuantity = async (req,res,next)=>{

    try{

        let existingProducts = await Cart.findOne({ deviceId: req.body.deviceId });

        orderDetails.username = req.params.username

        let query = Cart.findMany(orderDetails);


        return res.status(200).json({"status":true,"data":null}) 
        
    }catch(err){
        next(err)
    }
   
}
