const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const ApiFeatures=require("../utils/apiFeature");
//create Product
exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ message: true, product });
});

exports.getAllProducts = catchAsyncError(async (req, res) => {
const showPerPage=5;
const productCount=await Product.countDocuments();
const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(showPerPage);
 const products=await apiFeature.query;
  res.status(200).json(
    { success:true,
   products,
   productCount,
   });
});
exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
  console.log("get");
  const productDetail=await Product.findById(req.params.id);
  console.log(productDetail);
  if (!productDetail) {
    console.log("run");
    return next(new ErrorHandler("Product Detail not found",403));
  }
  res.status(200).json(
    { success:true,
    productDetail });
});
exports.updateProduct = catchAsyncError(async (req, res, next) => {
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
});
//delete product

exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
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
});