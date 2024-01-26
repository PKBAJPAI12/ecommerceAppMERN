const mongoose=require('mongoose');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, 
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000, 
    family: 4
}
const connectDB=()=>{
    mongoose.connect(process.env.DB_URL, options)
    .then((data) => {
      console.log(`Connected to MongoDB ${data.connection.host}`);
    }).catch(error => console.error('Error connecting to MongoDB:', error));; 
}
module.exports=connectDB
