const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User = require("../models/userModal");
const sendToken=require("../utils/jwtToken");
const sendEmail=require('../utils/sendEmail.js');
const crypto=require("crypto");
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
exports.logoutUser=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"User Logged Out",
    })
})
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    const resetToken=user.getResetPasswordToken();
    console.log(resetToken);
    await user.save({validateBeforeSave:false});
    //console.log(user);
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    console.log(resetPasswordUrl);
    const message=`Your Password Reset Token is: -\n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;
    console.log(message);
    try{
   await sendEmail({
     email:user.email,
     subject:`Ecommerec Password Recovery`,
     message,
   });
   res.status(200).json({
    success:true,
    message:`Email sent to ${user.email} successfully`,
   })
   }catch(error){
    console.log("catch");
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(error.message,500));
   }
})
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    // creating token hash
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

const user = await User.findOne({
  resetPasswordToken,
  resetPasswordExpire: { $gt: Date.now() },
});

if (!user) {
  return next(
    new ErrorHandler(
      "Reset Password Token is invalid or has been expired",
      400
    )
  );
}

if (req.body.password !== req.body.confirmPassword) {
  return next(new ErrorHandler("Password does not password", 400));
}

user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;

await user.save();

sendToken(user, 200, res);
})
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
  };
  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success:true,
  })

})
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
  const user=await user.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`));
  }
  res.status(200).json({
    success:true,
    user,
  })
})