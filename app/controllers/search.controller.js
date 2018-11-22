/*  Constants */
const Band = require('../models/band.model');

/* Global Variables */
var req_lat; // The latitude given by the location specified by user
var req_lng; // The longitude given by the location specified by user
var req_radius; // Search radius, specified by user

exports.get_search_results = function(req, res) {
	// console.log(req.params.query);
	console.log('Made it to GET');

	// var band = new Band(req.body);
	// console.log(band);

	var returned_bands = []
	Band.find({}).exec(function(err, bands) {
		if(err) throw err;
		
		for(let i = 0; i < bands.length; i++) {
			var lat = bands[i]['lat'];
			var lng = bands[i]['lng'];

			if(haversineDistance(lat, lng, req_lat, req_lng, true) <= req_radius) {
				// console.log(bands[i]['city'] + bands[i]['state']);
				returned_bands.push(bands[i]);
			}
		}	

		for(let i = 0; i < returned_bands.length; i++) {
			console.log(returned_bands[i]);
		}

		res.render('view-bands', { returned_bands: returned_bands });
	});
	
	
}

exports.search_within_radius = function(req, res) {
	req_radius = req.params.radius;	
	req_lat = req.body.lat;	
	req_lng = req.body.lng;	
	console.log("User Latitude: " + req_lat);
	console.log("User Longitude: " + req_lng);
	
	res.sendStatus(200);
	

	/* Here is where, for each zipcode in the database:
			1. DONE: Get its latitude and longitude 
			    * (call a new get geocode function -> do this in python script)
			    * https://stackoverflow.com/questions/5585957/
			    *  get-latlng-from-zip-code-google-maps-api
			2. DONE: Calculate the distance, and see if it is less than radius
			3. If it is less than radius, append to a JSON object
			4. When done searching, send the JSON object
	 */
}

/* Use the haversine formula to get the distance between 2 geographical coordinates
   Courtesy of Nathan Lippi's answer on
   https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
 */
function haversineDistance(lat1, lng1, lat2, lng2, isMiles) {
	function toRad(x) {
		return x * Math.PI/180;
	}

	var R = 6371; // Radius of earth, in km
	var x1 = lat2 - lat1;
	var dLat = toRad(x1);
	var x2 = lng2 - lng1;
	var dLon = toRad(x2);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;

	if(isMiles) d /= 1.60934;

  	return d;
}
