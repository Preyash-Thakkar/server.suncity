const express = require("express");
const router = express.Router();
const { listInquiries } = require("../controllers/listinquiries");

// Define route to handle form submission
router.post("/listinquiries", listInquiries);

module.exports = router;