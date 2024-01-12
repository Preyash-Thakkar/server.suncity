const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    InquiryName: {
      type: String,
      // required: true,
    },
    InquiryMail: {
      type: String,
      // required: true,
    },
    InquiryMobile:{
      type: Number,

    },
    InquiryPlotnumber: {
      type: Number,
      // required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuncityInquries", schema);
