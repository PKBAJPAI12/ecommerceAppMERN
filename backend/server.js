const app=require('./app');
const dotenv=require('dotenv');
dotenv.config({path:"backend/.env"});
const cloudinary=require("cloudinary");
const connectDB=require('./db/database');
//Handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
})
connectDB();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

//unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandeled Promise`);
    server.close(()=>{
        process.exit(1);
    })
})