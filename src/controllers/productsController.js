const errorResponse = require("../utils/errorResponse")
const Product =require("../models/Product");



exports.getproducts = async (req,res,next)=>{

    try{

        let queryStr = JSON.stringify(req.query);

        let reqQr = {...req.query}
     
        const removeField = ["select"]

        removeField.forEach(param => delete reqQr[param])

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/,match=>`$${match}`)
    

        let query = Product.find(JSON.parse(queryStr));

       
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort("-createdAt")
        }

        const page = parseInt(req.query.page,10)||1;
        const limit = parseInt(req.query.limit,10)||10;

        const skip = (page-1)*limit;

        query = query.skip(skip).limit(limit);

        const products = await query;
        return res.status(200).json({"status":true,"data":products}) 
    }catch(err){
        next(err)
    }
   
}

exports.getProduct = async (req,res,next)=>{
    
    try{
 
        const product = await Product.findOne({code:req.params.code}).populate("category");

        if(!product){
            return next(new errorResponse(`Product not found ${req.params.code}`,404));
        }
        return res.status(200).json({"status":true,"data":product}) 
    }catch(err){
        console.log(err)
        return next(new errorResponse(`Product not found ${req.params.code}`,404));
    }

   
}