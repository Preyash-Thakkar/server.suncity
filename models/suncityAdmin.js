const mongoose = require('mongoose');

const SuncityadminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Set a minimum password length
  },
});

const Admin = mongoose.model('Admin', SuncityadminSchema);

module.exports = Admin;
