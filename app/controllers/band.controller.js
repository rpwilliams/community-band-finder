const Band = require('../models/band.model');
const zipcodes = require('zipcodes')

exports.band_details = function(req, res) {
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
};