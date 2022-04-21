const express = require("express");
const Userprice = require("../src/models/userprice");
const router = express.Router();
var avgPrice;
var price1 = 0;
var price2=0;
var n=0;
var avgPrice=[];
// const getavgPrice2 = async () => {
//     avgPrice = await Userprice.find();
  
// }
// getavgPrice2();;
const getavgPrice = async (src, desti) => {
   
    avgPrice = await Userprice.find({ source: src, destination: desti});

}


router.get("/", (req, res) => {
    res.render("knowfare");
})


router.post("/", async (req, res) => {
    try {
        const User = new Userprice({
            name: req.body.name,
            source: req.body.source,
            destination: req.body.dest,
            price: req.body.price,
            mode:req.body.mode
        })
        const datasaved = await User.save();

        getavgPrice(req.body.source, req.body.dest);
        n = avgPrice.length;
        console.log("n is: ",n);
        price1=0;
        for (var i = 0; i < n; i++) {
            if(avgPrice[i].price!=null)
            {price1 = price1 + avgPrice[i].price;
            console.log("avgPrice[i].price: ",avgPrice[i].price);
            }

        }
        console.log("price1: sum",price1);
        if(n!=0)
        price1 = price1 / n;
        else
        price1=req.body.price;
        price1=Math.round(price1);
        console.log("price1: ",price1);
        res.status(201).render("average",{price1: price1});
    }
    catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;
