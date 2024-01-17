const mongoose = require('mongoose');

const SuncityadminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1, // Set a minimum password length
  },
});

const Admin = mongoose.model('Admin', SuncityadminSchema);

module.exports = Admin;
