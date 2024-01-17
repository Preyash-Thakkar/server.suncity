const mongoose = require("mongoose");

const Suncityplotdetails = new mongoose.Schema({
  plot_no: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'active'],
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
  remarks: {
    type: String, // or choose an appropriate type based on your needs
  },
});

module.exports = mongoose.model("Suncityplotdetails", Suncityplotdetails);
