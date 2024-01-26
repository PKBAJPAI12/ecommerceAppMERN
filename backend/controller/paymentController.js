const catchAsyncError=require("../middleware/catchAsyncError");
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment=catchAsyncError(async(req,res,next)=>{
   const myPayment=await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    description: 'Ecommerce',
    shipping: {
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
  },
    payment_method: 'pm_card_visa',
    metadata: {
        company: "Ecommerce",
    }
   });
   res.status(200).json({success: true, client_secret: myPayment.client_secret});
});

exports.sendStripeApiKey=catchAsyncError(async(req,res,next)=>{
   res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
});