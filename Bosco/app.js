// Setting Requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
app.use(express.static(__dirname + "views"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.get("/", function (req, res) {
    res.render("index");
});

app.post("/views/results.ejs", function (req, res) {
    let origins = req.body.origin;
    let destinations = req.body.destination;
    let distanceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origins + "&destinations=" + destinations + "&units=imperial&key=AIzaSyCEPwvSlyYoisJMueJMRN5PmfJt9TzgPpU";
    // Call the Google Distance Matrix API
    (async () => {
        try {
            const [distanceResponse] = await axios.all([axios.get(distanceUrl)]);
            // Get Distance and convert to miles
            let distance = Math.round(distanceResponse.data.rows[0].elements[0].distance.value /1609);
            let miles = distanceResponse.data.rows[0].elements[0].distance.text;
            let originAddress = distanceResponse.data.origin_addresses;
            let destinationAddress = distanceResponse.data.destination_addresses;
        } catch (error) {
            console.log(error.resopnse.body);
        }
    });
    res.render("results", {
        locationData: distanceResponse.data,
        miles: miles,
        originAddress: originAddress,
        destinationAddress: destinationAddress,
        distance: distance
    });
});

// Creating the Server
app.listen(process.env.PORT || 3000, function () {
    console.log("The server is running!");
});