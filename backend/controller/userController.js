const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User = require("../models/userModal");
const sendToken=require("../utils/jwtToken");

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log(name);
    console.log(email);
    const user=await User.create({
        name,email,password,
        profile:{
            public_id:"this is id",
            url:"profilePic"
        }
    });
    sendToken(user,201,res);
});
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    sendToken(user,200,res);
})