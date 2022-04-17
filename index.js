
const express  = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const http = require("http");
const port =process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.get("/", function(req, res){
   res.render("index");
});

 app.listen(port,(req,res)=>{
    console.log(`The application is running on port http://localhost:${port}`)

});