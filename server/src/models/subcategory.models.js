const mongoose=require("mongoose");

const subCategorySchema= new mongoose.Schema({
    cId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    subCatName:{
        type:String
    }
})
const subCategory=new mongoose.model("subCategories",subCategorySchema)
module.exports=subCategory