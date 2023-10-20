const Product = require("../models/productModel");

//create Product
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ message: true, product });
};

exports.getAllProducts = async (req, res) => {
 const products=await Product.find();
  res.status(200).json(
    { message: "Route is working fine",
   products });
};

exports.updateProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};
//delete product

exports.deleteProduct=async(req,res,next)=>{
    console.log(req.params.id);
    const product=await Product.findById(req.params.id);
    console.log(product);
    if(!product){
        console.log("run");
        return res.status(500).json({
            success: false,
            message: "Product not found",
          });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message:"Product Deleted Successfully"
      });
}