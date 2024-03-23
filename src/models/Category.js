const mongoose = require("mongoose") 

const CategorySchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
      
    },
    level:{
        type:Number,
        required:true
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
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]

})




module.exports = mongoose.model('Category',CategorySchema)