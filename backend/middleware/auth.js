const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt=require("jsonwebtoken");
const User = require("../models/userModal");
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login for Authorisation Access",401));
    }
   const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
   req.user=await User.findById(decodeToken.id);
   next();
})
exports.authorisedRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to acess this resource`,403));
        }
        next();
    }
}