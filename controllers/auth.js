const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const Admin = require('../models/suncityAdmin');


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    // console.log("Models password", admin.password);
    // console.log("Req password", password);
    console.log(admin)
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    


    const token = jwt.sign({ userId: admin._id }, 'your-secret-key', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = { login, logout };
