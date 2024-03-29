const errorResponse = require("../utils/errorResponse")
const Banner =require("../models/Banner");

const { query } = require("express");

exports.getBanners = async (req,res,next)=>{

    try{
     
        let query = Banner.findOne();

      
        const page = parseInt(req.query.page,10)||1;
        const limit = parseInt(req.query.limit,10)||10;

        const skip = (page-1)*limit;

        query = query.skip(skip).limit(limit);

        const banners = await query;
        return res.status(200).json({"status":true,"data":banners}) 
        
    }catch(err){
        next(err)
    }
   
}