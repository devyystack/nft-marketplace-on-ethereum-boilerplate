const mongoose=require("mongoose");
   
const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String()
    }
})
const category=new mongoose.model("categories",categorySchema)
module.exports=category