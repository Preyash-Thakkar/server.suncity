const express = require("express");
const router = express.Router();
const { listInquiries,getInquiriesByPlotNumber } = require("../controllers/listinquiries");

router.post("/listinquiries", listInquiries);
router.get("/listinquirybyplot",getInquiriesByPlotNumber)

module.exports = router;