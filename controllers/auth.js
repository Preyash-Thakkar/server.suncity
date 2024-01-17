const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const MarketExecutive = require('../models/MarketExecutive');


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const excecutive = await MarketExecutive.findOne({ email });
    // console.log("Models password", admin.password);
    // console.log("Req password", password);
    console.log(excecutive )
    if (!excecutive  || excecutive .password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    


    const token = jwt.sign({ userId: excecutive._id }, 'your-secret-key', { expiresIn: '1h' });

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
