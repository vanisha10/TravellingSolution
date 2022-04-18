const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/travelling",{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true}).then(()=>{console.log("connnection successful"); }).catch((e)=>{console.log("no connection");})