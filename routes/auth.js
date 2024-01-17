const express = require('express');
const router = express.Router();
const {login} = require('../controllers/auth');
const {logout} = require('../controllers/auth');

// const plotController = require('../controllers/plotcontroller');

// Route to fetch plot details based on plot number
router.post('/login', login);
router.post('/logout',logout);

module.exports = router;