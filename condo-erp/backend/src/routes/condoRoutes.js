// ...existing code...
const express = require('express');
const controller = require('../controllers/condoController');
const router = express.Router();

router.get('/', controller.list);

module.exports = router;
// ...existing code...
