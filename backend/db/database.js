const mongoose=require('mongoose');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
const connectDB=()=>{
    mongoose.connect(process.env.DB_URL, options)
    .then((data) => {
      console.log(`Connected to MongoDB ${data.connection.host}`);
    }).catch(error => console.error('Error connecting to MongoDB:', error));; 
}
module.exports=connectDB
