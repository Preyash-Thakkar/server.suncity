const mongoose = require("mongoose");

const LoginHistorySchema = new mongoose.Schema(
  { 
    WhoLogin: {          //company users id
      type: String,
      required: true,
    },
    WhoLoginName: {
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

module.exports = mongoose.model("MediaOwnerLoginHistory", LoginHistorySchema);