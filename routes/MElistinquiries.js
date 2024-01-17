const express = require("express");
const router = express.Router();
const { listMEInquiries } = require("../controllers/MElistinquiries");

router.post("/listMEinquiries", listMEInquiries);

module.exports = router;
