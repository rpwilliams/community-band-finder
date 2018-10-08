const express = require('express');
const router = express.Router();

const band_controller = require('../controllers/band.controller');

router.get('/:id', band_controller.band_details);

module.exports = router;