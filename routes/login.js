// routes/login.js
const express = require('express');
const router = express.Router();
const LoginHistory = require('../models/loginhistory');

router.post('/login', async (req, res) => {
  try {
    // Perform any login logic (e.g., check credentials)

    // Log login history
    const loginHistory = new LoginHistory({
      LoginName: req.body.email, // Adjust as per your login request
      LoginFromIP: req.ip,
    });
    await loginHistory.save();

    // Respond with login success or failure
    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
