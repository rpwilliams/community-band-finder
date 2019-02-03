const express = require('express');
const router = express.Router();

const disclaimer_controller = require('../controllers/disclaimer.controller');

router.get('/', disclaimer_controller.disclaimer_page);

module.exports = router;