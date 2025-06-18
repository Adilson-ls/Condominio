// ...existing code...
const express = require('express');
const controller = require('../controllers/financeController');
const router = express.Router();

router.get('/bills', controller.bills);
router.get('/expenses', controller.expenses);

module.exports = router;
// ...existing code...
