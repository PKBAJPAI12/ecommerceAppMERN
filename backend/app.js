const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')
const errorMiddleware=require('./middleware/error');
const dotenv=require('dotenv');
dotenv.config({path:"backend/.env"});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
const product=require('./routes/productRoute');
const user=require('./routes/userRoute');
const order=require('./routes/orderRoutes');
const payment=require('./routes/paymentRoute');
app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);
//middlerware for error
app.use(errorMiddleware);
module.exports=app