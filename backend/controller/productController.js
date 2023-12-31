const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const ApiFeatures=require("../utils/apiFeature");
//create Product
exports.createProduct = catchAsyncError(async (req, res) => {
  req.body.user=req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ message: true, product });
});

exports.getAllProducts = catchAsyncError(async (req, res) => {
  const showPerPage = 1;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  let products = await apiFeature.query;
  const filterProductCounts = products.length;
  const apiFeature1 = new ApiFeatures(Product.find(), req.query).search().filter().pagination(showPerPage);
  products = await apiFeature1.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    showPerPage,
    filterProductCounts,
  });
});

exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
  console.log("get");
  const product=await Product.findById(req.params.id);
  if (!product) {
    console.log("run");
    return next(new ErrorHandler("Product Detail not found",403));
  }
  res.status(200).json(
    { success:true,
      product, });
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
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
exports.deleteReview=catchAsyncError(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHandler("product not found",404));
  }
  const reviews=product.reviews.filter((rev)=>rev._id.toString!=req.query.id.toString);
  let avg=0;
  reviews.forEach((rev)=>{avg+=rev.rating;});
  const ratings=avg/reviews.length;
  const numOfReviews=reviews.length;
  await product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews,
  },
  {
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
res.status(200).json({
  success:true,
})
})