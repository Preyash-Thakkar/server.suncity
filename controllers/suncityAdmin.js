const Admin = require('../models/MarketExecutive');

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }

    const newAdmin = new Admin({ name, email, password });
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

const ChecksignIn = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required in the query parameters' });
    }

    // Check if the email exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Email not found' });
    }

    // Successfully found the email, sign in is possible
    return res.status(200).json({ success: true, message: 'Sign in is possible', data: admin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { createAdmin, getAllAdmins, ChecksignIn };
