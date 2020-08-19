const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Google Distance API
const origin = 
const destination = document.getElementById('destination').innerText;
const apiKey = 'AIzaSyCEPwvSlyYoisJMueJMRN5PmfJt9TzgPpU';
const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${apiKey}`;
const proxyUrl = 'https://afternoon-shelf-34525.herokuapp.com/'


// Get Distance from Google API
async function getDistance() {
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // Catch Error Here
    }
}

// Event Listener
submitBtn.addEventListener('click', getDistance);

// On Load
getDistance();

// Parse Application
app.use(bodyParser.urlencoded({ extended: false }));

// Starting Page
app.use(function (res, req) {
    res.render('index.html')
})

// Server
app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on port 3000.');
});