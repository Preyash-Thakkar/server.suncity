// controllers/loginController.js
const LoginHistory = require('../models/loginhistory');

const logLoginHistory = async (email, ipAddress) => {
  try {
    const loginHistory = new LoginHistory({
      LoginName: email,
      LoginFromIP: ipAddress,
    });
    await loginHistory.save();
  } catch (error) {
    console.error('Error logging login history:', error);
  }
};

module.exports = { logLoginHistory };
