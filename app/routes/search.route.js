const express = require('express');
const router = express.Router();

const search_controller = require('../controllers/search.controller');

router.get('/:radius', search_controller.search_within_radius);

router.post('/:radius', search_controller.search_within_radius);

module.exports = router;