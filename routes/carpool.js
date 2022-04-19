
const express = require("express");
const req = require("express/lib/request");
const Carpool = require("../src/models/Carpooldata");
const router = express.Router();
var result;

const getdocument = async () => {
    result = await Carpool.find();
}
getdocument();

const getdocument2 = async (src, dest) => {
    result = await Carpool.find({ source: src, destination: dest });

}

const deletedata = async (timetodelete) => {
    var dleted = await Carpool.deleteMany({ time: timetodelete })
    console.log("deleted")
}


router.get("/", (req, res) => {
    res.render("carpool")
})

router.post("/", async (req, res) => {
    try {
        const carpooltodata = new Carpool({
            name: req.body.name,
            phone_no: req.body.phone_no,
            source: req.body.source,
            destination: req.body.destination,
            time: req.body.time,
            count: req.body.count,
            preferred_mode: req.body.preferred_mode
        })

        const datasaved = await carpooltodata.save();
        console.log("data saved")
        getdocument2(req.body.source, req.body.destination);
        console.log(result);
        var selected = [];
        var hrs = parseInt(req.body.time.substring(0, 2));
        var mins = parseInt(req.body.time.substring(3));
        for (var i = 0; i < result.length; i++) 
        {
            var timehrs = parseInt(result[i].time.substring(0, 2));
            var timemins = parseInt(result[i].time.substring(3));

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time2 = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
            if (parseInt(time2.substring(0, 2)) > timehrs) 
            {
                deletedata(result[i].time);
                continue;
            }
            else if (parseInt(time2.substring(0, 2)) == timehrs && parseInt(time2.substring(3)) > timemins) 
            {
                deletedata(result[i].time);
                continue;
            }

            if (result[i].source == req.body.source && result[i].destination == req.body.destination) {
                if (mins < 30) {
                    if (timemins >= mins && timemins <= mins + 30 && hrs == timehrs) {
                        selected.push(result[i]);
                        console.log("pushed ")
                    }
                }
                else if (mins >= 30) {
                    if ((timehrs == ((hrs + 1) % 24) && timemins >= 0 && timemins <= ((mins + 30) % 60)) || (timehrs == hrs && timemins >= mins && timemins <= 59)) {
                        selected.push(result[i]);
                        console.log("pushed ")
                    }
                }
                if (mins >= 30) {
                    if (timemins <= mins && timemins >= mins - 30 && hrs == timehrs) {
                        selected.push(result[i]);
                        console.log("pushed ")
                    }

                }
                else if (mins < 30 && timehrs != 00) {
                    if ((timehrs == ((24 + (hrs - 1)) % 24) && timemins >= ((60 + (mins - 30))) && timemins <= 59) || (timehrs == hrs && timemins >= 0 && timemins <= mins)) {
                        selected.push(result[i]);
                        console.log("pushed ")
                    }
                }
            }
        }

        for (var i = 0; i < selected.length; i++)
            console.log("selected: ", selected[i].time, "result: ", selected[i].source, "to: ", selected[i].destination);

        res.status(201).render("carpool-show", { selected: selected });
    } 
    catch (error) 
    {
        res.status(400).send(error);
    }
})

module.exports = router;