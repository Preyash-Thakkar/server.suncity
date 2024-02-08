const mongoose = require("mongoose");

const SuncityplotdetailsSchema = new mongoose.Schema({
  plot_no: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'active'],
  },
  buyerName: String,
  buyerEmail: String,
  buyerMobileNo: String, // Change 'password' to 'mobile_no'
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
},
{ timestamps: true }
);

// Middleware to handle assigning buyer details when status changes
SuncityplotdetailsSchema.pre('save', async function(next) {
  if (this.isModified('status') && (this.status === 'sold' || this.status === 'reserved')) {
    // Your logic to handle storing buyer details
    // For now, let's assume buyerName, buyerEmail, and buyerMobileNo are passed when status changes
    // Replace the dummy logic below with your actual logic to handle buyer details
    this.buyerName = this.buyerName;
    this.buyerEmail = this.buyerEmail;
    this.buyerMobileNo = this.buyerMobileNo;
  }
  next();
});

const Suncityplotdetails = mongoose.model("Suncityplotdetails", SuncityplotdetailsSchema);

module.exports = Suncityplotdetails;
