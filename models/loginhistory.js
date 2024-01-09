const mongoose = require("mongoose");

const LoginHistorySchema = new mongoose.Schema(
  { 
    Login: {          //company users id
      type: String,
      required: true,
    },
    LoginName: {
      type: String,
      required: true,
    },
    LoginFromIP: {
      type: String,
      required: true,
    },
    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginHistory", LoginHistorySchema);