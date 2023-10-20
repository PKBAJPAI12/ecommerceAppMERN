const Product=require("../models/productModel");

//create Product
exports.createProduct=async (req,res)=>{
    const product=await Product.create(req.body);
    res.status(201).json({message:true,product});
}

exports.getAllProducts=(req,res)=>{
    res.status(200).json({message:"Route is working finr"});
}