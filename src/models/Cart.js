const mongoose = require("mongoose") 

const CartSchema = new mongoose.Schema({
    
    token:{
        type:String,
        required:true

    },
    userName:{
        type:String,
        required:true
 
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
       
    },
    varient:{
        type:mongoose.Schema.ObjectId,
        ref:"Varient",
        required:true
    },
    varientCode:{
        type:String,
        required:true,

    },
    quantity:{
        type:Number,
        required:true,
    },

    
})

module.exports = mongoose.model('Cart',CartSchema)