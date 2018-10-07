const Band = require('../models/band.model');

exports.band_details = function(req, res) {
	Band.findById(req.params.id, function (err, band) {
		if(err) return err;
		res.send(band);
	})
};