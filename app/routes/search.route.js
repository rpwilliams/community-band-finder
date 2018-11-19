const express = require('express');
const router = express.Router();

const search_controller = require('../controllers/search.controller');

router.get('/:radius/:query', search_controller.get_search_results);

router.post('/:radius', search_controller.search_within_radius);

module.exports = router;