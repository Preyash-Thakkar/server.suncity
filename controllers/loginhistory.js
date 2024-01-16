// Import necessary modules and models
const express = require('express');
const passport = require('passport');
const LoginHistory = require('../models/loginhistory');

const router = express.Router();

// Admin login route
router.post('/admin-login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Successful login, create login history entry
    const loginEntry = new LoginHistory({
      Login: user.id,  // Assuming user object has an 'id' property representing user ID
      LoginName: user.username, // Assuming user object has a 'username' property representing login name
      LoginFromIP: req.ip, // Using Express request object to get IP address
    });

    // Save the login history entry
    loginEntry.save()
      .then(savedEntry => {
        console.log('Login history saved:', savedEntry);
      })
      .catch(error => {
        console.error('Error saving login history:', error);
      });

    // Continue with authentication process
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).json({ message: 'Authentication successful' });
    });
  })(req, res, next);
});

module.exports = router;
