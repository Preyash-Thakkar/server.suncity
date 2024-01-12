const express = require("express");
const router = express.Router();
const { listInquiries } = require("../controllers/listinquiries");

router.post("/listinquiries", listInquiries);

module.exports = router;