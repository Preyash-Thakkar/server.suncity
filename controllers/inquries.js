var nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const ContactUs = require("../models/inquries");

exports.CreateSendContactUs = async (req, res) => {
  try {
    const { InquiryName, InquiryMail, InquirySubject  } = req.body;
    console.log(InquiryName, InquiryMail, InquirySubject );
    const addContactUs = await new ContactUs({
      InquiryName,
      InquiryMail,
      InquirySubject,
      
    }).save();

    res.json(addContactUs);

    const transporter = nodemailer.createTransport({
      // host: "mail.anaxanet.com",
      host: "mail.marwiz.in",
      port: 587,
      secureConnection: false,
      auth: {
        user: "contact@marwiz.in",
        // pass: "ConM@2022#",
        pass: "CTmar@009#2023",
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    // Setup email data
    const mailOptions = {
      from: "contact@marwiz.in",
      to: InquiryMail, // Replace with recipient's email address
      subject: InquirySubject,
      text: `${InquiryName} has to inquire for: ${InquirySubject}`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
