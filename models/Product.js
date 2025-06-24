const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        reuired:true,
    },
    description:{
        type:String
    },
    stock:{
        type:Number,
        default:1
    },
    category:{type:String}
},{timestamps:true});
module.exports=mongoose.model("Product",productSchema);