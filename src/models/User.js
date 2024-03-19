const mongoose = require("mongoose") 

const UserSchema = new mongoose.Schema({
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
    specialNote:{
        type:String,
        required:true,

    },
    isNewArrival:{
       type:Number,
       required:true,

    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
      
     }


})

module.exports = mongoose.model('User',UserSchema)