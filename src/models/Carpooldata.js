const mongoose=require("mongoose")
const myschema=new mongoose.Schema({
 name:{type:String,required:true}, 
 phone_no:{type:Number,required:false},
 source:{type:String,required:true},
 destination:{type:String,required:true},
 time:{type:String,required:true},
 count:{type:Number,required:true},
 preferred_mode:{type:String,required:false}
})

//creating collections

const Carpool=new mongoose.model("Carpool",myschema)
module.exports=Carpool;