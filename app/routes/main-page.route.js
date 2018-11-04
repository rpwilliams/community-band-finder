const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	var lat, long;
	res.render('main-page', { lat: lat, long: long });
});

module.exports = router;