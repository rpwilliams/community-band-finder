const express = require('express');
const router = express.Router();

const update_controller = require('../controllers/update.controller');

router.get('/', update_controller.update_page);

module.exports = router;