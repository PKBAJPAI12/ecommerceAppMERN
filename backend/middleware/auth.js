const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt=require("jsonwebtoken");
const User = require("../models/userModal");
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ErrorHandler('Please Login for Authorisation Access', 401));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeToken.id);
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid or expired token', 401));
    }
})
exports.authorisedRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to acess this resource`,403));
        }
        next();
    }
}