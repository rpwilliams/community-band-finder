const express = require('express');
const router = express.Router();

const main_page_controller = require('../controllers/main-page.controller');

router.get('/', main_page_controller.main_page);

module.exports = router;