const Band = require('../models/band.model');

exports.search_within_radius = function(req, res) {
	var req_radius = req.params.radius;	// Search radius, specified by user
	var req_lat = req.body.lat;	// The latitude given by the location specified by user
	var req_lng = req.body.lng;	// The longitude given by the location specified by user
	console.log("Textbox Latitude: " + req_lat);
	console.log("Textbox Longitude: " + req_lng);

	Band.find({}).exec(function(err, bands) {
		if(err) throw err;
		
		for(var i = 0; i < bands.length; i++) {
			var lat = bands[i]['lat'];
			var lng = bands[i]['lng'];

			if(haversineDistance(lat, lng, req_lat, req_lng, true) <= req_radius) {
				console.log(bands[i]['city'] + bands[i]['state']);
			}
		}	
		console.log('Done');
	});



	/* Here is where, for each zipcode in the database:
			1. DONE: Get its latitude and longitude 
			    * (call a new get geocode function -> do this in python script)
			    * https://stackoverflow.com/questions/5585957/get-latlng-from-zip-code-google-maps-api
			2. DONE: Calculate the distance, and see if it is less than radius
			3. If it is less than radius, append to a JSON object
			4. When done searching, send the JSON object
	 */
	res.send(req.body);
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

// exports.band_details = function(req, res) {
	// function get
	// function get_zipcodes_within_radius(zipcode, radius) {
	// 	/* Get all the zipcodes within the provided search radius */
	// 	return zipcodes.radius(zipcode, radius);

	// 	// rad_zipcodes.forEach(function(zip) {
	// 	// 	console.log(zip);
	// 	// });/* Get all the zipcodes within the provided search radius */

	// 	// res.send(rad_zipcodes);
	// }
	
	// let zipcodes_within_radius = get_zipcodes_within_radius(req.params.zipcode, req.params.radius);
	// var cities = [];
	// zipcodes_within_radius.forEach(function(zipcode) {
	// 	let location_data = zipcodes.lookup(zipcode);
	// 	let city = location_data.city;
	// 	let state = location_data.state;
	// 	if(!cities.includes(city)) {
	// 		cities.push(city);
	// 	}
	// });

	/* Note for future self: making an array of object for the 
		cities may work for adding states. Do this first! */

	// bands = [];
	// cities.forEach(function(city) {
	// 	Band.find({city: city}, function(err, band) {
	// 		if(err) return err;
	// 		bands.push(band);
	// 		console.log(band);
	// 	});
	// });
	// res.send(JSON.stringify(bands[0]));
	

	//let bands = [];
	//cities.forEach(function(city) {
		// bands.push(Band.find(city));
		/*bands.push(Band.find({city: city}, function(err, band) {
			if(err) return err;
			console.log(city);
			return city;
		}));*/
	//});

	// bands.forEach(function(band) {
	// 	console.log(band);
	// });
	//console.log(bands[0].city);
	// res.send(bands[0]);
	// res.send(bands);
	// Band.find(function(err, band) {
	// 	if(err) return err;


	// 	res.send(band);
	// });
// };