// routes/plotRoutes.js
const express = require('express');
const router = express.Router();
const plotController = require('../controllers/plotcontroller');

// Route to fetch plot details based on plot number
router.get('/plot-details/:plotNumber', plotController.getPlotDetails);

module.exports = router;
