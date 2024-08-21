const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User = require("../models/userModal");
const sendToken=require("../utils/jwtToken");
const sendEmail=require('../utils/sendEmail.js');
const crypto=require("crypto");
const cloudinary=require('cloudinary');
exports.registerUser=catchAsyncError(async(req,res,next)=>{
  const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale"
  })
  console.log(myCloud);
    const {name,email,password}=req.body;
    console.log(name);
    console.log(email);
    const user=await User.create({
        name,email,password,
        profile:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });
    console.log(`user ${user}`);
    sendToken(user,201,res);
});
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    console.log('body', req.body);
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }
    const user=await User.findOne({email}).select("+password");
    console.log(user);
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);
    console.log(isPasswordMatched);
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
    //const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
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
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.profile.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.profile = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    console.log(`newUserData ${JSON.stringify(newUserData)}`);
  }
  console.log(req.user.id);
  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  console.log(`user ${user}`);
  res.status(200).json({
    success:true,
  })

})
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
  const users=await user.findById();
  res.status(200).json({
    success:true,
    users,
  })
})
// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});
// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});