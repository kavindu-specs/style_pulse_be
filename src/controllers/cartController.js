const errorResponse = require("../utils/errorResponse")
const Cart =require("../models/Cart");
const Product =require("../models/Product");
const cartHelper =require("../helpers/cartHelper");

const { query } = require("express");


exports.getCartItems = async (req,res,next)=>{

    try{
        
        const cartId = req.query.username ? req.query.username:req.query.deviceId
       
        let query = Cart.findOne({deviceId: req.query.deviceId}).populate("products.productId");
        
        if(req.query.username){
            query = Cart.findOne({username: req.query.username}).populate("products.productId");
        }

        let cartDetails = await query;
        if(!cartDetails){
            return res.status(422).json({"status":false,"data":null}) 
        }
        
        // let cartSubTotal=0,cartTotal=0,taxTotal=0,itemsCount=0,discountTotal= 0;

        // cartDetails.products.forEach(product=>{

        //     cartSubTotal += product.productId.defaultPrice*product.quantity
        //     taxTotal += parseInt(product.productId.isTaxEnabled)===1?product.productId.defaultPrice*0.08*product.quantity : 0
        //     console.log(parseInt(product.productId.isTaxEnabled))
        //     itemsCount += 1
        //     discountTotal += product.productId.defaultPrice*product.productId.discount*0.01*product.quantity;
           
        // })
        // cartTotal = cartSubTotal +taxTotal - discountTotal

        // cartDetails = cartDetails.toObject();

        // cartDetails.cartSubTotal = cartSubTotal
        // cartDetails.taxTotal = taxTotal
        // cartDetails.itemsCount = itemsCount
        // cartDetails.discountTotal = discountTotal
        // cartDetails.cartTotal = cartTotal
        let cartData = cartHelper.calculateCart(cartDetails)

        return res.status(200).json({"status":true,"data":cartData}) 
        
    }catch(err){
        console.log(err)
        next(err)
    }
   
}

exports.addItems = async (req,res,next)=>{

    try{

        let existingProducts = await Cart.findOne({deviceId:req.body.deviceId}) 
    
        if(existingProducts){
            const productExists = existingProducts.products.some(product => product.varientId == req.body.products.varientId);
         
            if (productExists) {
                return res.status(422).json({ "status": false, "data": [] });
            } else {
     
                existingProducts.products.push(req.body.products);
                await existingProducts.save();
                return res.status(200).json({ "status": true, "data": [] });

            }
          
        }

        const items = await Cart.create(req.body);

        return res.status(201).json({"status":true,"data":[]})
        
    }catch(err){
        console.log(err)
        next(err)
    }
   
}

exports.removeItems = async (req,res,next)=>{

    try{

        let existingProducts = await Cart.findOne({ deviceId: req.params.deviceId });
    
        if (!existingProducts) {
            return res.status(200).json({ "status": false, data: null });
        }
    
        existingProducts.products = existingProducts.products.filter(item => item.varientId !== req.params.code);

        if( existingProducts.products.length===0){
           await existingProducts.deleteOne()
           
        }else{
          await existingProducts.save();
         
        }

        let cartDetails = await Cart.findOne({ deviceId: req.params.deviceId }).populate("products.productId");
        if(!cartDetails){
            return res.status(422).json({"status":true,"data":null}) 
        }
        let cartData = cartHelper.calculateCart(cartDetails)

        return res.status(200).json({"status":true,"data":cartData})
        
    }catch(err){
        next(err)
    }
   
}

exports.updateQuantity = async (req,res,next)=>{

    try{
        console.log(req.body)
        let cart = await Cart.findOne({ deviceId: req.body.deviceId });
console.log(cart)
        cart.products.forEach((item)=>{
            if (item.varientId === req.body.varientId){
                console.log(item.varientId)
                item.quantity = req.body.mark === "p"?item.quantity+1:item.quantity-1;
            }
        })
       
        await cart.save()

        let cartDetails = await Cart.findOne({ deviceId: req.body.deviceId }).populate("products.productId");

        let cartData = cartHelper.calculateCart(cartDetails)

        return res.status(200).json({"status":true,"data":cartData})
        
    }catch(err){
        console.log(err)
        next(err)
    }
   
}

exports.updateItemVarient = async (req,res,next)=>{

    try{

        let cart = await Cart.findOne({ deviceId: req.body.deviceId });

        cart.products.forEach((item)=>{
            if (item.varientId === req.body.varientId){
               
                item.varientId = req.body.newVarientId
                item.varient = {size:req.body.size,color:req.body.color}
                
                //item.varient.color = req.body.color
                console.log(item.varient )
            }
        })
       
        await cart.save()

        let cartDetails = await Cart.findOne({ deviceId: req.body.deviceId }).populate("products.productId");

        let cartData = cartHelper.calculateCart(cartDetails)

        return res.status(200).json({"status":true,"data":cartData})
        
    }catch(err){
        console.log(err)
        next(err)
    }
   
}

