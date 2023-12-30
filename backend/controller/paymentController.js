const catchAsyncError=require("../middleware/catchAsyncError");
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment=catchAsyncError(async(req,res,next)=>{
    //populate used for get specified data from particular model of mentioned fields
   const myPayment=await stripe.paymentIntents.create({
    ammount: req.body.ammount,
    currency: "inr",
    metadata: {
        company: "Ecommerce",
    }
   });
   res.status(200).json({success: true, client_secret: myPayment.client_secret});
});

exports.sendStripeApiKey=catchAsyncError(async(req,res,next)=>{
    //populate used for get specified data from particular model of mentioned fields
   res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
});