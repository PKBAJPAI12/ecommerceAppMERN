const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    name:{

    },
    description:{

    },
    price:{
      required:[true,"Please Enter Product Price"],  
      maxLength:[8,"Price cannot exceed 8 characters"]
    },
    rating:{
      default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,""],
        maxLength:[4,""],
        default:1
    },
    reviews:[
        {
            name:{

            },
            rating:{

            },
            comment:{
                
            }
        }
    ]
})