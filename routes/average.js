const express = require("express");
const Userprice = require("../src/models/userprice");
const router = express.Router();
var avgPrice;
var price1 = 0;
var price2=0;
const getavgPrice2 = async () => {
    avgPrice = await Userprice.find();
  
}
const getavgPrice = async (src, desti,mode) => {
    avgPrice = await Userprice.find({ source: src, destination: desti,mode:mode });
  
}
getavgPrice2();;

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
        getavgPrice(req.body.source, req.body.dest,"Auto");
        var n = Object.keys(avgPrice).length;
        for (var i = 0; i < n; ++i) {
            if(avgPrice[i].price!=null)
            price1 = price1 + avgPrice[i].price;
        }
        if(n!=0)
        price1 = price1 / n;
        else
        price1=50;
        price1=Math.round(price1);
        getavgPrice(req.body.source, req.body.dest,"Cab/Taxi");
        var n = Object.keys(avgPrice).length;
        for (var i = 0; i < n; ++i) {
            if(avgPrice[i].price!=null)
            price2 = price2 + avgPrice[i].price;
            
        }
        if(n!=0)
        price2 = price2 / n;
        else
        price2=200;
        price2=Math.round(price2);
        res.status(201).render("average",{price1: price1,price2:price2});
    }
    catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;
