const mongoose = require("mongoose") 

const VarientSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
      
    },
    name:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
 
    },
    thumbnailImage:{
        type:String,
        required:true
       
    },
    price:{
        type:Number,
        required:true,

    },
    isDefault:{
        type:Number,
        required:true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
     },
    stock:{
       type:Number,
       required:true
    },
    options:{
       type:Object,

    },
    
})




module.exports = mongoose.model('Varient',VarientSchema)