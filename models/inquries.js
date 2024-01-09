const mongoose = require("mongoose");

const SuncityInquries = new mongoose.Schema(
  {
    InquiryName: {
      type: String,
      // required: true,
    },
    InquiryMail: {
      type: String,
      // required: true,
    },
    InquirySubject: {
      type: String,
      // required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", SuncityInquries);
