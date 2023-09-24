const app=require('./app');
const dotenv=require('dotenv');
dotenv.config({path:"backend/.env"});
const connectDB=require('./db/database');
connectDB();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})