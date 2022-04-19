const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
   
    name:{type:String,required:true},
    source:{type:String,required:true},
    destination:{type:String,required:true},
    price:{type:Number,required:true}
})

const Userprice=new mongoose.model("Userprice",userSchema);
module.exports=Userprice;