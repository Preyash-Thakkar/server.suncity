const express = require("express");
const router = express.Router();
const { submitForm,deleteInquiry,editInquiryStatus } = require("../controllers/inquries");

// Define route to handle form submission
router.post("/submit-form", submitForm);
router.delete('/inquiries/:_id', deleteInquiry);
router.put('/inquiries/edit/:_id',editInquiryStatus);

module.exports = router;
