// controllers/suncityAdmin.js
const passport = require('passport');
const Admin = require('../models/suncityAdmin');
const LoginHistory = require('../models/loginhistory');

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    return res.status(201).json({ success: true, message: 'Admin created successfully', data: newAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, '-password');
    return res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const loginAdmin = (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Log the admin login history
    const loginHistory = new LoginHistory({
      adminId: user._id,
      loginName: user.email,
      loginFromIP: req.ip, // Assuming req.ip provides the client's IP address
    });
    await loginHistory.save();

    // Continue with the authentication process
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ success: true, message: 'Login successful', user });
    });
  })(req, res, next);
};

module.exports = { createAdmin, getAllAdmins, loginAdmin };
