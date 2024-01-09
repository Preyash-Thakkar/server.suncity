const mongoose = require("mongoose");

const Suncityplotdetails = new mongoose.Schema({
  plot_no: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'active'],
    required: true
  },
  dimensions: {
    length: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  area: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("plotdetails", Suncityplotdetails);
