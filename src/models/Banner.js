const mongoose = require("mongoose") 

const BannerSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
 
    },
    type:{
        type:String,
        required:true
       
    },
    image:[{ 
        type: String,
        required: true,
    }],

    
})




module.exports = mongoose.model('Banner',BannerSchema)