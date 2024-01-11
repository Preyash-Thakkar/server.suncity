const mongoose = require("mongoose");

const Suncityplotdetails = new mongoose.Schema({
  plot_no: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'active'], // Include 'active' in the enum
  },
  Length: {
    type: Number,
  },
  width: {
    type: Number,
  },
  area: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Suncityplotdetails", Suncityplotdetails);
