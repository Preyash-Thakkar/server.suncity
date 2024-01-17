const mongoose = require("mongoose");

const marketExecutiveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type:String,
      required:true,
    },
  },
  { timestamps: true }
);

const MarketExecutive = mongoose.model("MarketExecutive", marketExecutiveSchema);

module.exports = MarketExecutive;
