const Band = require('../models/band.model');

exports.band_details = function(req, res) {
	Band.find({city: req.params.city}, function (err, band) {
		if(err) return err;
		res.send(band);
	});
};