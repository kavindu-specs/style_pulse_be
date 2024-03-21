const errorResponse = require("../utils/errorResponse")
const Category =require("../models/Category");

const { query } = require("express");

exports.getCategories = async (req,res,next)=>{

    try{

     
        let query = Category.find();

        const page = parseInt(req.query.page,10)||1;
        const limit = parseInt(req.query.limit,10)||10;

        const skip = (page-1)*limit;

        query = query.skip(skip).limit(limit);

        const categories = await query;
        return res.status(200).json({"status":true,"data":categories}) 
        
    }catch(err){
        next(err)
    }
   
}

exports.getCategory = async (req,res,next)=>{

    try{

        let query = Category.findOne({code:req.params.code}).populate("products");


        const category = await query;
        return res.status(200).json({"status":true,"data":category}) 
        
    }catch(err){
        next(err)
    }
   
}