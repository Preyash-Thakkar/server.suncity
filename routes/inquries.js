const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Define route to handle form submission
router.post("/submit-form", (req, res) => {
  // Retrieve form data from request body
  const { name, phone, email, mobile, message } = req.body;

  // Create transport object with SMTP settings
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    // port: 465,
    // port: 587,
    secure: true,
    auth: {
      user: "ravi.marwiz@gmail.com",
      pass: "Ravi.marwiz.0508",
    },
  });

  // Create email message object
  const mailOptions = {
    from: email,
    to: "ravi.marwiz@gmail.com",
    subject: "New form submission",
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending message");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Message sent successfully");
    }
  });
});

module.exports = router;
