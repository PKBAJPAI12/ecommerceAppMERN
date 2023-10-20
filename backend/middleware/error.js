const ErrorHandler=require('../utils/errorHandler');
module.exports=(err,req,res,next)=>{
    err.statusCode=er.statusCode || 500;
    err.message=err.message || "Interenal Server Errror";
    res.status(err,statusCode).json({
        success:false,
        error:err,
    });
}