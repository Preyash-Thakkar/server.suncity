const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    MarketExecutiveName:{
        type: String,
    },
    InquiryName: {
      type: String,
    },
    InquiryMail: {
      type: String,
    },
    InquiryMobile: {
      type: Number,
    },
    InquiryPlotnumber: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'attended'],
      default: 'pending'
    },
    plot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Suncityplotdetails',
    },
  },
  { timestamps: true }
);

// Pre-save hook to populate plot_id based on InquiryPlotnumber
schema.pre('save', async function (next) {
  try {
    const plotDetails = await mongoose.model('Suncityplotdetails').findOne({ plot_no: this.InquiryPlotnumber });

    if (plotDetails) {
      this.plot_id = plotDetails._id;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("MESuncityInquries", schema);
