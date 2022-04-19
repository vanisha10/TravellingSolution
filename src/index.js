const express  = require("express");
const app = express();
const hbs = require("hbs");
const path = require('path');
const mongoose=require("mongoose");


require("dotenv").config();
require("./db/conn.js")
const Carpool=require("./models/Carpooldata")
var bodyParser = require("body-parser");
const http = require("http");
const port =process.env.PORT || 3000;
// mongoose.connect("mongoose://localhost:27017/travel",{useNewUrlParser:true,useUnifiedTopoplogy: true}).then(()=>console.log("Connection successful")).catch((err)=>console.log(err) );
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// var urlencodedParser=bodyParser.urlencoded({extended: true});

const templatePath=path.join(__dirname,"../templates/views");
const partialPath=path.join(__dirname,"../templates/partials");

app.set("view engine", "hbs");
app.set("views",templatePath)
hbs.registerPartials(partialPath);

const indexRoute=require('../routes/index')
app.use("/",indexRoute);
const carpoolRoute=require('../routes/carpool')
app.use("/carpool",carpoolRoute);
const averageRoute=require('../routes/average')
app.use("/average",averageRoute);



 app.listen(port,(req,res)=>{
    console.log(`The application is running on port http://localhost:${port}`)

});