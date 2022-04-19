const express = require("express");
const Userprice = require("../src/models/userprice");
const router = express.Router();
var avgPrice;
var price = 0;
const getavgPrice2 = async () => {
    avgPrice = await Userprice.find();
  
}
const getavgPrice = async (src, desti) => {
    avgPrice = await Userprice.find({ source: src, destination: desti });
  
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
            price: req.body.price
        })
        const datasaved = await User.save();
        getavgPrice(req.body.source, req.body.dest);
        var n = Object.keys(avgPrice).length;
        for (var i = 0; i < n; ++i) {
            price = price + avgPrice[i].price;
        }
        price = price / n;
        console.log("cbkhdg",price);
        console.log("price is: ",price)
        res.status(201).render("average",{price: price});
    }
    catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;
