const mongoose = require("mongoose") 
const Category = require('./Category');
const ProductSchema = new mongoose.Schema({
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
    defaultPrice:{
        type:Number,
        required:true,

    },
    thumbnailImage:{
        type:String,
        required:true
       
    },
    isMoreToLove:{
        type:Number,
        required:true,

    },
    rating:{
        type:Number,
        required:true,

    },
    discount:{
        type:Number,
        required:true,
        default:0
    },
    isTaxEnabled:{
        type:Number,
        default:0
    },
    specialNote:{
        type:String,
        required:true,

    },
    isNewArrival:{
       type:Number,
       required:true,

    },
    image:{
        type:String,
        required:true,
 
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
      
     }


})

module.exports = mongoose.model('Product',ProductSchema)