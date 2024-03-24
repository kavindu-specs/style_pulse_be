const errorResponse = require("../utils/errorResponse")
const Cart =require("../models/Cart");
const Product =require("../models/Product");

const { query } = require("express");


exports.getCartItems = async (req,res,next)=>{

    try{

        const cartId = req.query.username ? req.query.username:req.query.deviceId

        let query = Cart.findOne({
            $or: [
                { username: cartId},
                { deviceId: cartId }
            ]
        }).populate("products.productId");

        let cartDetails = await query;

        
        let cartSubTotal=0,cartTotal=0,taxTotal=0,itemsCount=0,discountTotal= 0;

        cartDetails.products.forEach(product=>{

            cartSubTotal += product.productId.defaultPrice*product.quantity
            taxTotal += parseInt(product.productId.isTaxEnabled)===1?product.productId.defaultPrice*0.08*product.quantity : 0
            console.log(parseInt(product.productId.isTaxEnabled))
            itemsCount += 1
            discountTotal += product.productId.defaultPrice*product.productId.discount*0.01*product.quantity;
           
        })
        cartTotal = cartSubTotal +taxTotal - discountTotal

        cartDetails = cartDetails.toObject();

        cartDetails.cartSubTotal = cartSubTotal
        cartDetails.taxTotal = taxTotal
        cartDetails.itemsCount = itemsCount
        cartDetails.discountTotal = discountTotal
        cartDetails.cartTotal = cartTotal

        return res.status(200).json({"status":true,"data":cartDetails}) 
        
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
