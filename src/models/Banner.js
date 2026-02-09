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
    image1:{ 
        type: String,
        required: true,
    },
    image2:{ 
        type: String,
        required: true,
    },
    image3:{ 
        type: String,
        required: true,
    },

    
})




module.exports = mongoose.model('Banner',BannerSchema)