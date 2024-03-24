const mongoose = require("mongoose") 
const Product = require('./Product');
const Varient = require('./Varient');
const CartSchema = new mongoose.Schema({
    
  
    deviceId:{
        type:String,
        required:true
 
    },
    userName:{
        type:String,
        
    },
    
    products:[
        {
       productId:{
         type: mongoose.Schema.ObjectId,
         ref:"Product",
       }, 
       varient:{
        type: Object
       },
       quantity:{
        type:Number,
        default:1
        
       },
       displayName:{
         type:String,
         required:true,
       },
     }

    ]

    
})

module.exports = mongoose.model('Cart',CartSchema)