const nodemailer = require("nodemailer");
// const {SuncityInquiries} = require("../models/inquries");
const  SuncityInquries  = require( "../models/inquries.js");

const submitForm = async (req, res) => {
  const { name, email, mobile, plotNumber } = req.body;
  
  try {
    await SuncityInquries.create({
      InquiryName: name,
      InquiryMail: email,
      InquiryMobile: mobile,
      InquiryPlotnumber: plotNumber,
    });
    console.log("Form details saved to MongoDB");
  } catch (error) {
    console.error("Error saving form details to MongoDB:", error);
    res.status(500).send("Internal Server Error");
    return;
  }

  // Respond immediately to the client
  res.status(200).send("Form received, processing...");

  // Process email sending in the background
  sendEmail(name, email, mobile, plotNumber);
};

const deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await SuncityInquries.findByIdAndDelete(req.params._id);

    if (!deletedInquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
        error: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted!",
      deletedInquiry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

const editInquiryStatus = async (req, res) => {
  try {
    const updatedInquiry = await SuncityInquries.findByIdAndUpdate(
      req.params._id,
      { $set: { status: 'attended' } },
      { new: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
        error: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry status updated to attended",
      updatedInquiry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};


const sendEmail = (name, email, mobile, plotNumber) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "marwiz.tech@gmail.com",
      pass: "abuoxineboamaqkm",
    },
  });

  const mailOptions = {
    from: email,
    to: "pateldhruvit0712@gmail.com",
    subject: "New form submission",
    text: `Name: ${name}\nPhone: ${mobile}\nEmail: ${email}\nPlot-Number:${plotNumber}`,
  };

  const mailOptionsToUser = {
    from: "pateldhruvit0712@gmail.com",
    to: email,
    subject: "Thank You for Your Inquiry",
    text: `Hello ${name},\n\nThank you for your inquiry about Plot Number ${plotNumber}. We will get back to you soon.\n\nBest regards,\nSuncity pvt LTD`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  transporter.sendMail(mailOptionsToUser, (error, info) => {
    if (error) {
      console.error("Error sending thank you email to user:", error);
    } else {
      console.log("Thank you email sent to user: " + info.response);
    }
  });
};

module.exports = {
  submitForm,deleteInquiry,editInquiryStatus
};
