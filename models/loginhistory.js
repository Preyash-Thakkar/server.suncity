const mongoose = require('mongoose');

const LoginHistorySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    loginName: {
      type: String,
      required: true,
    },
    loginFromIP: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LoginHistory', LoginHistorySchema);
