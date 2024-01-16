// routes/suncityAdmin.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

const { createAdmin, getAllAdmins, loginAdmin } = require('../controllers/suncityAdmin');

// Middleware to check if the user is already authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Unauthorized' });
};

// Route to create admin
router.post('/admin/create', createAdmin);

// Route to get all admins (requires authentication)
router.get('/admin/all', isAuthenticated, getAllAdmins);

// Route for admin login
router.post('/admin/login', loginAdmin);

module.exports = router;
