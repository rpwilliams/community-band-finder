const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.render('main-page');
});

router.post('/search/:radius', function(req, res) {
	var radius = req.params.radius;
	var lat = req.body.lat;
	var long = req.body.long;
	console.log("Latitude: " + lat);
	console.log("Longitude: " + long);

	/* Here is where, for each zipcode in the database:
			1. Get its latitude and longitude 
			    * (call a new get geocode function -> do this in python script)
			    * https://stackoverflow.com/questions/5585957/get-latlng-from-zip-code-google-maps-api
			2. Calculate the distance, and see if it is less than radius
			3. If it is less than radius, append to a JSON object
			4. When done searching, send the JSON object
	 */
	res.send(req.body);
});

module.exports = router;