const mongoose = require("mongoose");

const SuncityLoginHistorySchema = new mongoose.Schema(
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

module.exports = mongoose.model("LoginHistory", SuncityLoginHistorySchema);