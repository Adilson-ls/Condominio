// ...existing code...
const express = require('express');
const controller = require('../controllers/communicationController');
const router = express.Router();

router.get('/notices', controller.notices);
router.get('/occurrences', controller.occurrences);

module.exports = router;
// ...existing code...
